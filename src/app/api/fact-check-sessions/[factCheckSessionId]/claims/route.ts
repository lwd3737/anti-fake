import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import {
  CreateClaimsRequestDto,
  GetClaimsResponseDto,
} from '@/gateway/dto/claim';
import { ErrorCode } from '@/gateway/error/error-code';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { ContentType } from '@/models/fact-check-session';
import claimRepo from '@/repositories/claim';
import { isFailure } from '@/result';
import ClaimService from '@/services/claim';
import FactCheckSessionService from '@/services/fact-check-session';
import Youtube from '@/libs/youtube';
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

  // TODO: youtube 서비스로 교체
  const transcriptResult = await Youtube.generateTranscript(
    contentId,
    req.signal,
  );
  if (isFailure(transcriptResult)) {
    console.error(transcriptResult);

    const { code, message: error } = transcriptResult;
    return handleRouteError(code, error, 400);
  }

  const streamResult = await new ClaimService(
    req.signal,
  ).createClaimsStreamFromTranscript(transcriptResult, factCheckSessionId);

  if (isFailure(streamResult)) {
    const { code, message: error } = streamResult;
    return handleRouteError(code, error, 500);
  }

  const stream = streamResult;
  return new Response(stream);
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
