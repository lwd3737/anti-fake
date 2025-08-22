import {
  GetClaimVerificationsResponseDto,
  VerifyClaimMessageDto,
} from '@/gateway/dto/claim-verification';
import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import claimVerificationRepo from '@/repositories/claim-verification';
import { isFailure } from '@/result';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetrievalService from '@/services/evidence-retrieval';
import { NextRequest, NextResponse } from 'next/server';
import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { ErrorCode } from '@/gateway/error/error-code';
import FactCheckSessionService from '@/services/fact-check-session';
import { createUIMessageStream, createUIMessageStreamResponse } from 'ai';

interface Params {
  factCheckSessionId: string;
}

export const runtime = 'nodejs';

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const guardResult = await guardRouteHandler();
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  const { factCheckSessionId } = params;
  const { user } = guardResult;

  const authorizationResult = await new FactCheckSessionService().getOwn({
    factCheckSessionId,
    userId: user.id,
  });
  if (isFailure(authorizationResult)) {
    const { code, message: error } = authorizationResult;
    return handleRouteError(code, error, 401);
  }

  try {
    const verifications =
      await claimVerificationRepo.findBySessionId(factCheckSessionId);

    return NextResponse.json({
      claimVerifications: verifications,
    } satisfies GetClaimVerificationsResponseDto);
  } catch (error) {
    return handleRouteError(
      ErrorCode.CLAIM_VERIFICATIONS_READ_FAILED,
      'Claim verifications read failed',
      500,
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { factCheckSessionId } = params;
  const { claims } = (await req.json()) as VerifyClaimsRequestDto;

  const evidencesResultStream = new EvidenceRetrievalService(
    req.signal,
  ).retrieveEvidencesStream(claims);
  const claimVerificationService = new ClaimVerificationService(req.signal);

  const stream = createUIMessageStream<VerifyClaimMessageDto>({
    async execute({ writer }) {
      let idx = 0;
      for await (const evidencesResult of evidencesResultStream) {
        if (isFailure(evidencesResult)) {
          const failure = evidencesResult;
          writer.write({
            type: 'data-error',
            data: {
              code: failure.code,
              message: 'evidence retrieval error',
              claimId: failure.context!.claimId,
            },
          });
          idx++;
          continue;
        }

        const evidences = evidencesResult;
        const claim = claims[idx];
        const verificationResult = await claimVerificationService.verify({
          factCheckSessionId,
          claim,
          evidences,
        });

        if (isFailure(verificationResult)) {
          const failure = verificationResult;
          writer.write({
            type: 'data-error',
            data: {
              code: failure.code,
              message: 'claim verification error',
              claimId: failure.context!.claimId,
            },
          });
          idx++;
          continue;
        }

        const claimVerification = verificationResult;
        writer.write({
          type: 'data-claim-verification',
          data: { claimVerification },
        });
        idx++;
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { factCheckSessionId } = params;

  try {
    await claimVerificationRepo.deleteManyBySessionId(factCheckSessionId);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.debug(error);
    return handleRouteError(
      ErrorCode.CLAIM_VERIFICATIONS_DELETE_FAILED,
      'Claim verifications delete failed',
      500,
    );
  }
}
