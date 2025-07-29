import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import {
  CreateClaimsRequestDto,
  GetClaimsResponseDto,
} from '@/gateway/dto/claim';
import { ErrorCode } from '@/gateway/error/error-code';
import {
  Failure,
  handleRouteError,
} from '@/gateway/error/reponse-error-handler';
import { streamingResponse } from '@/gateway/streaming/streaming-response';
import { Claim } from '@/models/claim';
import { ContentType } from '@/models/fact-check-session';
import claimRepo from '@/repositories/claim';
import { isFailure } from '@/result';
import ClaimService from '@/services/claim';
import FactCheckSessionService from '@/services/fact-check-session';
import YoutubeService from '@/services/youtube';
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

  const transcriptResult = await new YoutubeService().getTranscript(contentId);
  if (isFailure(transcriptResult)) {
    const { code, message } = transcriptResult;
    return handleRouteError(code, message, 500);
  }

  let claimsStream: AsyncIterable<Claim>;
  const transcript = transcriptResult;
  try {
    claimsStream = new ClaimService(req.signal).streamClaimFromTranscript(
      transcript,
      factCheckSessionId,
    );
  } catch (error) {
    const { code, message } = error as Failure<ErrorCode.CLAIMS_CREATE_FAILED>;
    return handleRouteError(code, message, 500);
  }

  return streamingResponse(async ({ send, close }) => {
    for await (const claim of claimsStream) {
      send(claim);
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
