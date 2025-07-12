import { GetClaimVerificationsResponseDto } from '@/gateway/dto/claim-verification';
import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { streamingResponse } from '@/gateway/streaming/streaming-response';
import claimVerificationRepo from '@/repositories/claim-verification';
import { isFailure } from '@/result';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetrievalService from '@/services/evidence-retrieval';
import { NextRequest, NextResponse } from 'next/server';
import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { ErrorCode } from '@/gateway/error/error-code';
import FactCheckSessionService from '@/services/fact-check-session';

interface Params {
  factCheckSessionId: string;
}

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

  return streamingResponse(async ({ send, close }) => {
    let idx = 0;
    for await (const evidencesResult of evidencesResultStream) {
      if (isFailure(evidencesResult)) {
        const failure = evidencesResult;
        console.error(failure);
        continue;
      }

      const evidences = evidencesResult;
      const claim = claims[idx];
      const verificationResult = await new ClaimVerificationService(
        req.signal,
      ).verify({
        factCheckSessionId,
        claim,
        evidences,
      });

      send(verificationResult);
      idx++;
    }

    close();
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { factCheckSessionId } = params;

  try {
    await claimVerificationRepo.deleteManyBySessionId(factCheckSessionId);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleRouteError(
      ErrorCode.CLAIM_VERIFICATIONS_DELETE_FAILED,
      'Claim verifications delete failed',
      500,
    );
  }
}
