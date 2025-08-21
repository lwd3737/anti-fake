import { openai } from '@/libs/ai';
import { generateObject, GenerateObjectResult } from 'ai';
import { z } from 'zod';
import LLMHistoryLogger from '@/logger/llm-history.logger';
import CLAIM_VERIFICATION_PROMPT from '@/prompts/claim-verification';
import {
  ClaimVerification,
  VerdictType,
  VerificationEvidence,
} from '@/models/claim-verification';
import { Claim } from '@/models/claim';
import { v4 as uuidv4 } from 'uuid';
import claimVerificationRepo from '@/repositories/claim-verification';
import { ErrorCode } from '@/gateway/error/error-code';
import { isFailure, Result } from '@/result';

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

  constructor(private signal: AbortSignal) {}

  public async verify({
    factCheckSessionId,
    claim,
    evidences,
  }: {
    factCheckSessionId: string;
    claim: Claim;
    evidences: VerificationEvidence[];
  }): Promise<
    Result<
      ClaimVerification,
      ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED,
      { claimId: string }
    >
  > {
    const verificationResult = await this.generateVerification({
      claim,
      evidences,
    });
    if (isFailure(verificationResult)) {
      const failure = verificationResult;
      console.debug(failure);
      return {
        ...failure,
        context: { claimId: claim.id },
      };
    }

    const { verdict, verdictReason } = verificationResult;
    const newVerification: ClaimVerification = {
      id: uuidv4(),
      factCheckSessionId,
      claimId: claim.id,
      verdict,
      verdictReason,
      evidences,
    };

    try {
      await claimVerificationRepo.create(newVerification);
    } catch (error) {
      console.debug(error);
      return {
        code: ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED,
        message: 'Failed to create claim verification on repository',
        context: { claimId: claim.id },
      };
    }

    return newVerification;
  }

  private async generateVerification({
    claim,
    evidences,
  }: {
    claim: Claim;
    evidences: VerificationEvidence[];
  }): Promise<
    Result<
      GenerateObjectResult<{
        verdict: VerdictType;
        verdictReason: string;
      }>['object'],
      ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED
    >
  > {
    const prompt = `
        # Claim
        ${claim.content}

        # Evidence
        ${evidences
          .map((item, idx) => `${idx + 1}. ${item.summary}`)
          .join('\n')}`;

    try {
      const streamResult = await generateObject({
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
      return streamResult.object;
    } catch (error) {
      return {
        code: ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED,
        message: 'Failed to generate verification from ai',
        context: error as Record<string, any>,
      };
    }
  }
}
