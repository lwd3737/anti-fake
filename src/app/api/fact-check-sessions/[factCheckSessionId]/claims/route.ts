import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import {
  CreateClaimsRequestDto,
  GetClaimsResponseDto,
} from '@/gateway/dto/claim';
import { ErrorCode } from '@/gateway/error/error-code';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { streamingResponse } from '@/gateway/streaming/streaming-response';
import { ContentType } from '@/models/fact-check-session';
import claimRepo from '@/repositories/claim';
import { isFailure } from '@/result';
import ClaimService from '@/services/claim';
import FactCheckSessionService from '@/services/fact-check-session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params: { factCheckSessionId },
  }: { params: { factCheckSessionId: string } },
) {
  const guardResult = await guardRouteHandler();
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  const { user } = guardResult;

  const factCheckSessionResult = await new FactCheckSessionService().getOwn({
    factCheckSessionId,
    userId: user.id,
  });
  if (isFailure(factCheckSessionResult)) {
    const { code, message: error } = factCheckSessionResult;
    return handleRouteError(code, error, 401);
  }

  // FIX: factCheckSession 부재시 예외 처리 필요
  const factCheckSession = factCheckSessionResult;
  const claims = await claimRepo.findManyBySessionId(factCheckSession.id);

  return NextResponse.json({ claims } as GetClaimsResponseDto);
}

export async function POST(
  req: NextRequest,
  {
    params: { factCheckSessionId },
  }: { params: { factCheckSessionId: string } },
) {
  const guardResult = await guardRouteHandler();
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  const { contentType, contentId } =
    (await req.json()) as CreateClaimsRequestDto;
  // TODO: Add more content types
  if (contentType !== ContentType.YOUTUBE_VIDEO)
    return handleRouteError(
      ErrorCode.CONTENT_TYPE_NOT_SUPPORTED,
      'Only YouTube videos are supported',
      400,
    );

  const { user } = guardResult;

  const factCheckSessionResult = await new FactCheckSessionService().getOwn({
    factCheckSessionId,
    userId: user.id,
  });
  if (isFailure(factCheckSessionResult)) {
    const { code, message: error } = factCheckSessionResult;
    return handleRouteError(code, error, 401);
  }

  const claims = await new ClaimService(req.signal).createClaimsFromVideo(
    contentId,
    factCheckSessionId,
  );

  return streamingResponse(async ({ send, close }) => {
    for await (const claimResult of claims) {
      send(claimResult);
    }
    close();
  });
}

export async function DELETE(
  req: NextRequest,
  {
    params: { factCheckSessionId },
  }: { params: { factCheckSessionId: string } },
) {
  const guardResult = await guardRouteHandler();
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  try {
    await claimRepo.deleteManyBySessionId(factCheckSessionId);
    // TODO: verification 초기화
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return handleRouteError(
      ErrorCode.FACTCHECK_SESSION_RESET,
      'Failed to reset fact check session',
      500,
    );
  }
}
