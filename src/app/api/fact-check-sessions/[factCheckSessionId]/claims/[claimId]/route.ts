import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import { ErrorCode } from '@/gateway/error/error-code';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import claimRepo from '@/repositories/claim';
import { isFailure } from '@/result';
import FactCheckSessionService from '@/services/fact-check-session';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { factCheckSessionId: string; claimId: string } },
) {
  const guardResult = await guardRouteHandler();
  if (!guardResult.isAuthenticated) {
    return guardResult.redirect();
  }

  const { factCheckSessionId, claimId } = params;
  console.log('delete claim', factCheckSessionId, claimId);
  if (!factCheckSessionId || !claimId) {
    return handleRouteError(
      ErrorCode.CLAIM_DELETE_FAILED,
      'fact check session id or claim id is required',
      400,
    );
  }

  const factCheckSession = await new FactCheckSessionService().getOwn({
    factCheckSessionId,
    userId: guardResult.user.id,
  });
  if (isFailure(factCheckSession)) {
    return handleRouteError(factCheckSession.code, factCheckSession.message);
  }

  try {
    await claimRepo.delete(factCheckSessionId, claimId);
  } catch (error) {
    console.error(error);
    return handleRouteError(
      ErrorCode.CLAIM_DELETE_FAILED,
      'claim delete failed',
      500,
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
