import { AIModel, openai } from '@/libs/ai';
import { streamObject, StreamObjectResult } from 'ai';
import { z } from 'zod';
import EventEmitter from 'events';
import LLMHistoryLogger from '@/logger/llm-history.logger';
import loadConfig from '@/config';
import { Claim } from '@/models/claim';
import { v4 as uuidv4 } from 'uuid';
import { YoutubeVideoTranscription } from '@/models/youtube';
import YOUTUBE_CLAIM_DETECTION_PROMPT from '@/prompts/youtube-claim-detection';
import claimRepo from '@/repositories/claim';
import { isFailure, Result } from '@/result';
import { createStreamController } from '@/utils/stream';
import { ErrorCode } from '@/gateway/error/error-code';
import { Failure } from '@/gateway/error/reponse-error-handler';
import Youtube from '@/libs/youtube';

enum EventType {
  CLAIM_DETECTED = 'CLAIM_DETECTED',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

const ClaimSchema = z.object({
  content: z
    .string()
    .describe(
      '검증 가능한 주장과 그 맥락을 포함한 문장들. 주장 자체뿐만 아니라 주장을 이해하는데 필요한 문맥도 함께 포함합니다',
    ),
  detectionReason: z
    .string()
    .describe(
      '이 주장이 사실 검증이 가능하고 가치가 있다고 판단한 근거를 설명합니다',
    ),
  startAt: z.number().describe('주장이 시작되는 시간(초)'),
  endAt: z.number().describe('주장이 끝나는 시간(초)'),
});

type TClaimSchema = z.infer<typeof ClaimSchema>;

const STREAM_INTERVAL = 100;

export default class ClaimService {
  private events = new EventEmitter();
  private logger = new LLMHistoryLogger('detect-claims', {
    title: 'Detect claims',
  });
  private claimsCache: Claim[] = [];

  constructor(private signal: AbortSignal) {}

  // TODO: logger 추가
  public async createClaimsStreamFromVideo(
    videoId: string,
    factCheckSessionId: string,
  ): Promise<Result<ReadableStream>> {
    const transcriptResult = await Youtube.generateTranscript(
      videoId,
      this.signal,
    );
    if (isFailure(transcriptResult)) {
      const failure = transcriptResult;
      return failure;
    }

    const transcription = transcriptResult;
    const transcriptParts = transcription.segments.map(
      ({ start, end, text }) => ({
        start,
        end,
        text,
      }),
    );
    const prompt = JSON.stringify(transcriptParts);

    const streamResult = await this.streamClaims(prompt);
    if (isFailure(streamResult)) {
      const failure = streamResult;
      return failure;
    }

    const { stream, sendChunk, closeStream } = createStreamController(
      this.signal,
    );

    let index = 0;
    for await (const claim of streamResult) {
      const newClaim: Claim = {
        id: uuidv4(),
        index,
        ...claim,
      };
      sendChunk(newClaim);

      try {
        await claimRepo.create(factCheckSessionId, newClaim);
      } catch (error) {
        // TODO: 에러 로깅
        const failure: Failure = {
          code: ErrorCode.CLAIMS_CREATE_FAILED,
          message: 'Failed to create claim on repository',
        };
        console.error(error, failure);
        sendChunk(failure);
      }
      index++;
    }

    closeStream();

    return stream;
  }

  private async streamClaims(
    prompt: string,
  ): Promise<Result<AsyncIterable<TClaimSchema>>> {
    try {
      const streamResult = streamObject({
        model: openai(AIModel.GPT_4O),
        system: YOUTUBE_CLAIM_DETECTION_PROMPT,
        prompt,
        mode: 'json',
        output: 'array',
        schema: ClaimSchema,
        schemaName: 'Claims',
        schemaDescription:
          '자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.',
        temperature: 0,
      });
      return streamResult.elementStream;
    } catch (error) {
      return {
        code: ErrorCode.CLAIMS_CREATE_FAILED,
        message: 'Failed to stream claims from ai',
        context: error as Record<string, any>,
      };
    }
  }

  public async startTranscriptionDetection(
    transcription: YoutubeVideoTranscription,
    factCheckSessionId: string,
  ): Promise<void> {
    if (this.isDevMode) return this.startTranscriptionDetectionOnDevMode();

    this.claimsCache = [];

    const segments = transcription.segments.map(({ start, end, text }) => ({
      start,
      end,
      text,
    }));
    const prompt = JSON.stringify(segments);

    this.logger.monitor(async (log, error, save) => {
      try {
        const result = streamObject({
          model: openai(AIModel.GPT_4O),
          system: YOUTUBE_CLAIM_DETECTION_PROMPT,
          prompt,
          mode: 'json',
          output: 'array',
          schema: ClaimSchema,
          schemaName: 'Claims',
          schemaDescription:
            '자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.',
          temperature: 0,
          onFinish: async (event) => {
            if (!event.object || event.object.length === 0) {
              this.events.emit(
                EventType.ERROR,
                new Error('No claims detected'),
              );
              console.error('No claims detected in the response');
              return;
            }

            this.events.emit(EventType.FINISHED, this.claimsCache);
            await claimRepo.createMany(factCheckSessionId, this.claimsCache);

            log({
              title: 'Claims detection',
              model: 'gpt-4o',
              prompt,
              output: this.claimsCache,
              tokenUsage: event.usage,
            });
            save();

            this.claimsCache = [];
          },
          abortSignal: this.signal,
        });

        const reader = result.elementStream.getReader();
        let index = 0;

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const newClaim: Claim = {
              ...value,
              id: uuidv4(),
              index: index++,
            };

            this.events.emit(EventType.CLAIM_DETECTED, newClaim);
            this.claimsCache.push(newClaim);
          }
        } catch (e) {
          reader.cancel();
          this.events.emit(EventType.ERROR, e as Error);

          console.error('Error reading from stream:', e);
        } finally {
          reader.releaseLock();
          console.log('Releasing stream lock');
        }
      } catch (e) {
        error({
          code: 'DetectClaimsError',
          error: e as Error,
        });
        this.events.emit(EventType.ERROR, e as Error);
        this.claimsCache = [];

        console.error(e);
      }
    });
  }

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimDetection ?? devMode.default;
  }

  private async startTranscriptionDetectionOnDevMode(): Promise<void> {
    const mockData = await import('/mock/claims.json');
    const { mockDataCount } = loadConfig();

    const dataCount = mockDataCount ?? mockData.claims.length;
    const claims = mockData.claims.slice(0, dataCount);

    for (let index = 0; index < dataCount; index++) {
      const claim = claims[index];
      this.events.emit(EventType.CLAIM_DETECTED, { ...claim, index });

      await new Promise((resolve) => setTimeout(resolve, STREAM_INTERVAL));
    }

    const claimsWithIndex = claims.map((claim, index) => ({
      ...claim,
      index,
    }));

    this.events.emit(EventType.FINISHED, {
      output: claimsWithIndex,
    });
  }

  public onClaimDetected(listener: (claim: Claim) => void): this {
    this.events.on(EventType.CLAIM_DETECTED, listener);
    return this;
  }

  public onFinished(listener: (claims: Claim[]) => void): this {
    this.events.on(EventType.FINISHED, listener);
    return this;
  }

  public onError(listener: (error: Error) => void): this {
    this.events.on(EventType.ERROR, listener);
    return this;
  }
}
