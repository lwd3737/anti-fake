import { openai } from '@/helpers/ai';
import { generateObject } from 'ai';
import { z } from 'zod';
import LLMHistoryLogger from '@/logger/llm-history.logger';
import loadConfig from '@/config';
import VERIFY_CLAIM_PROMPT from '@/prompts/verify-claim';
import {
  ClaimVerificationResult,
  VerdictType,
} from '@/models/claim-verification';

const ClaimVerificationResultSchema = z.object({
  verdict: z
    .union([
      z.literal(VerdictType.TRUE),
      z.literal(VerdictType.MOSTLY_TRUE),
      z.literal(VerdictType.MIXED),
      z.literal(VerdictType.MOSTLY_FALSE),
      z.literal(VerdictType.FALSE),
      z.literal(VerdictType.UNKNOWN),
    ])
    .describe('주장의 진실 여부 판결'),
  reason: z.string().describe('주장에 대한 판결에 대한 이유 및 근거'),
});

export default class ClaimVerificationService {
  private logger = new LLMHistoryLogger('claim-verifier', {
    title: 'Claim verifier',
  });

  constructor(private signal: AbortSignal) {}

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimVerification ?? devMode.default;
  }

  public async verify(
    {
      claim,
      evidence,
    }: {
      claim: string;
      evidence: string[];
    },
    isCompleted?: boolean,
  ): Promise<ClaimVerificationResult> {
    if (this.isDevMode) return this.verifyOnDevMode();

    const result = this.logger.monitor<ClaimVerificationResult>(async () => {
      const prompt = `${claim}\n${evidence
        .map((item, idx) => `${idx + 1}.${item}`)
        .join('\n')}`;

      const result = await generateObject({
        model: openai('gpt-4o'),
        system: VERIFY_CLAIM_PROMPT,
        prompt,
        mode: 'json',
        schema: ClaimVerificationResultSchema,
        schemaName: 'ClaimVerificationResult',
        schemaDescription: '주장에 대한 검증 결과를 판단하세요.',
        temperature: 0,
        abortSignal: this.signal,
      });

      return result.object;
    });

    if (isCompleted) this.logger.save();

    return result;
  }

  private async verifyOnDevMode(): Promise<ClaimVerificationResult> {
    const { claimVerificationResults } = await import(
      '/mock/claim-verification-results.json'
    );
    const idx = Math.floor(Math.random() * claimVerificationResults.length);
    return claimVerificationResults[idx] as ClaimVerificationResult;
  }
}
