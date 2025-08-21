import { AIModel, openai } from '@/libs/ai';
import { streamObject } from 'ai';
import loadConfig from '@/config';
import { Claim } from '@/models/claim';
import { v4 as uuidv4 } from 'uuid';
import YOUTUBE_CLAIM_DETECTION_PROMPT from '@/prompts/youtube-claim-detection';
import claimRepo from '@/repositories/claim';
import { isFailure, Result } from '@/result';
import { ErrorCode } from '@/gateway/error/error-code';
import { Failure } from '@/gateway/error/reponse-error-handler';
import { YoutubeVideoTranscript } from '@/models/youtube';
import { ClaimSchema } from '@/schemas/claim';

export default class ClaimService {
  constructor(private signal: AbortSignal) {}

  // TODO: logger 추가
  public async *streamClaimFromTranscript(
    transcript: YoutubeVideoTranscript,
    factCheckSessionId: string,
  ): AsyncIterable<Claim> {
    const prompt = JSON.stringify(transcript.segments);

    const claimsResult = await this.streamClaim(prompt);
    if (isFailure(claimsResult)) {
      console.debug(claimsResult);
      const failure = claimsResult;
      // return failure;
      throw failure;
    }

    let index = 0;
    for await (const claim of claimsResult) {
      const newClaim: Claim = {
        id: uuidv4(),
        index,
        ...claim,
      };

      yield newClaim;

      try {
        await claimRepo.create(factCheckSessionId, newClaim);
      } catch (error) {
        // TODO: 에러 로깅, 클라이언트에 전송
        const failure: Failure<ErrorCode.CLAIM_CREATE_FAILED> = {
          code: ErrorCode.CLAIM_CREATE_FAILED,
          message: 'Failed to create claim on repository',
        };
        console.debug(error, failure);
        // yield failure;
      }

      index++;
    }
  }

  private async streamClaim(
    prompt: string,
  ): Promise<
    Result<AsyncIterable<ClaimSchema>, ErrorCode.CLAIM_CREATE_FAILED>
  > {
    try {
      const streamResult = streamObject({
        model: openai(AIModel.GPT_4O_MINI),
        system: YOUTUBE_CLAIM_DETECTION_PROMPT,
        prompt,
        mode: 'json',
        output: 'array',
        schema: ClaimSchema,
        schemaName: 'Claims',
        schemaDescription:
          '자막에서 사실적으로 검증 가능하고 검증할 가치가 있는 주장과 이유를 나타냅니다.',
        temperature: 0,
        abortSignal: this.signal,
      });
      return streamResult.elementStream;
    } catch (error) {
      return {
        code: ErrorCode.CLAIM_CREATE_FAILED,
        message: 'Failed to stream claims from ai',
        context: error as Record<string, any>,
      };
    }
  }

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimDetection ?? devMode.default;
  }
}
