import { AIModel, openai } from '@/helpers/ai';
import { streamObject } from 'ai';
import DETECT_CLAIM_PROMPT from '@/prompts/detect-claim';
import { z } from 'zod';
import EventEmitter from 'events';
import LLMHistoryLogger from '@/logger/llm-history.logger';
import loadConfig from '@/config';
import { Claim } from '@/models/claim';
import { v4 as uuidv4 } from 'uuid';

enum EventType {
  CLAIM_DETECTED = 'CLAIM_DETECTED',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

const ClaimSchema = z.object({
  content: z
    .string()
    .describe(
      '탐지된 검증 가능한 주장 및 관련된 문장. 주장에 해당하는 문장뿐만 아니라 관련된 문장들도 함께 content에 포함시킬 수 있습니다',
    ),
  detectionReason: z
    .string()
    .describe('해당 주장이 검증 가능한 주장으로 탐지된 이유'),
});

const STREAM_INTERVAL = 100;

export default class ClaimService {
  private events = new EventEmitter();
  private logger = new LLMHistoryLogger('detect-claims', {
    title: 'Detect claims',
  });
  private claimsCache: Claim[] = [];

  constructor(private signal: AbortSignal) {}

  public async startDetection(text: string): Promise<void> {
    if (this.isDevMode) return this.startDetectionOnDevMode();

    this.claimsCache = [];

    this.logger.monitor(async (log, error, save) => {
      try {
        const result = streamObject({
          model: openai(AIModel.GPT_4O),
          system: DETECT_CLAIM_PROMPT,
          prompt: text,
          mode: 'json',
          output: 'array',
          schema: ClaimSchema,
          schemaName: 'DetectedClaims',
          schemaDescription:
            '자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.',
          temperature: 0,
          onFinish: (event) => {
            if (!event.object || event.object.length === 0) {
              console.error('No claims detected in the response');
              this.events.emit(
                EventType.ERROR,
                new Error('No claims detected'),
              );
              return;
            }
            this.events.emit(EventType.FINISHED, this.claimsCache);

            log({
              title: 'Claims detection',
              model: 'gpt-4o',
              prompt: text,
              output: this.claimsCache,
              tokenUsage: event.usage,
            });
            save();

            this.claimsCache = [];
          },
          abortSignal: this.signal,
        });

        let index = 0;

        const reader = result.elementStream.getReader();
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
          console.error('Error reading from stream:', e);
          reader.cancel();
          this.events.emit(EventType.ERROR, e as Error);
        } finally {
          console.log('Releasing stream lock');
          reader.releaseLock();
        }
      } catch (e) {
        console.error(e);
        error({
          code: 'DetectClaimsError',
          error: e as Error,
        });
        this.events.emit(EventType.ERROR, e as Error);
        this.claimsCache = [];
      }
    });
  }

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimDetection ?? devMode.default;
  }

  private async startDetectionOnDevMode(): Promise<void> {
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
