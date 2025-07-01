import { openai } from '@/helpers/ai';
import { generateObject } from 'ai';
import { z } from 'zod';
import LLMHistoryLogger from '@/logger/llm-history.logger';
import loadConfig from '@/config';
import CLAIM_VERIFICATION_PROMPT from '@/prompts/claim-verification';
import {
  ClaimVerification,
  VerdictType,
  VerificationEvidence,
} from '@/models/claim-verification';
import { Claim } from '@/models/claim';
import { v4 as uuidv4 } from 'uuid';
import claimVerificationRepo from '@/repositories/claim-verification';

const ClaimVerificationSchema = z.object({
  verdict: z
    .union([
      z.literal(VerdictType.TRUE),
      z.literal(VerdictType.MOSTLY_TRUE),
      z.literal(VerdictType.MIXED),
      z.literal(VerdictType.MOSTLY_FALSE),
      z.literal(VerdictType.FALSE),
      z.literal(VerdictType.UNKNOWN),
    ])
    .describe('주장의 사실 여부 판결'),
  verdictReason: z.string().describe('주장에 대한 판결에 대한 이유 및 근거'),
});

type ClaimVerificationSchema = z.infer<typeof ClaimVerificationSchema>;

export default class ClaimVerificationService {
  private logger = new LLMHistoryLogger('claim-verification', {
    title: 'Claim verification',
  });
  private cache: ClaimVerification[] = [];

  constructor(private signal: AbortSignal) {}

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimVerification ?? devMode.default;
  }

  public async verify(
    {
      factCheckSessionId,
      claim,
      evidences,
    }: {
      factCheckSessionId: string;
      claim: Claim;
      evidences: VerificationEvidence[];
    },
    isCompleted?: boolean,
  ): Promise<ClaimVerification> {
    if (this.isDevMode) {
      const { verdict, verdictReason } = await this.verifyOnDevMode();
      return {
        id: uuidv4(),
        factCheckSessionId,
        claimId: claim.id,
        verdict,
        verdictReason,
        evidences,
      };
    }

    // TODO: 에러 핸들링
    const { verdict, verdictReason } =
      await this.logger.monitor<ClaimVerificationSchema>(async () => {
        const prompt = `
        # Claim
        ${claim.content}

        # Evidence
        ${evidences
          .map((item, idx) => `${idx + 1}. ${item.summary}`)
          .join('\n')}`;

        const result = await generateObject({
          model: openai('gpt-4o'),
          system: CLAIM_VERIFICATION_PROMPT,
          prompt,
          mode: 'json',
          schema: ClaimVerificationSchema,
          schemaName: 'ClaimVerification',
          schemaDescription: '주장에 대한 검증 결과를 판단하세요.',
          temperature: 0,
          abortSignal: this.signal,
        });

        return result.object;
      });

    const newVerification = {
      id: uuidv4(),
      factCheckSessionId,
      claimId: claim.id,
      verdict,
      verdictReason,
      evidences,
    };

    this.cache.push(newVerification);

    if (isCompleted) {
      await claimVerificationRepo.createMany(this.cache);
      this.cache = [];

      this.logger.save();
    }

    return newVerification;
  }

  private async verifyOnDevMode(): Promise<
    Pick<ClaimVerification, 'verdict' | 'verdictReason'>
  > {
    const { claimVerifications } = await import(
      '/mock/claim-verification.json'
    );
    const idx = Math.floor(Math.random() * claimVerifications.length);
    return claimVerifications[idx] as Pick<
      ClaimVerification,
      'verdict' | 'verdictReason'
    >;
  }
}
