import { guardRouteHandler } from '@/gateway/auth/guard-route-handler';
import {
  CreateClaimsRequestDto,
  GetClaimsResponseDto,
} from '@/gateway/dto/claim';
import { CreateClaimsResponseDto } from '@/gateway/dto/fact-check';
import { ErrorCode } from '@/gateway/error/error-code';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { streamResponse } from '@/gateway/streaming/stream-response';
import { ContentType } from '@/models/fact-check-session';
import { OauthProviderType } from '@/models/user';
import claimRepo from '@/repositories/claim';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import userRepo from '@/repositories/user';
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
  const guardResult = await guardRouteHandler(req);
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  const user = await userRepo.findByProviderSub({
    provider: OauthProviderType.GOOGLE,
    providerSub: guardResult.providerSub,
  });
  if (!user) {
    return handleRouteError(ErrorCode.UNAUTHENTICATED, 'User not found', 401);
  }

  const authorizationResult = await new FactCheckSessionService().authoirze({
    factCheckSessionId,
    ownerId: user.id,
  });
  if (isFailure(authorizationResult)) {
    const { code, error } = authorizationResult;
    return handleRouteError(code, error, 401);
  }

  const factCheckSession = authorizationResult;
  const claims = await claimRepo.findManyBySessionId(factCheckSession.id);

  return NextResponse.json({ claims } as GetClaimsResponseDto);
}

export async function POST(req: NextRequest) {
  const guardResult = await guardRouteHandler(req);
  if (!guardResult.isAuthenticated) return guardResult.redirect();

  const { factCheckSessionId, userId, contentType, contentId } =
    (await req.json()) as CreateClaimsRequestDto;
  // TODO: Add more content types
  if (contentType !== ContentType.YOUTUBE_VIDEO)
    return handleRouteError(
      ErrorCode.CONTENT_TYPE_NOT_SUPPORTED,
      'Only YouTube videos are supported',
      400,
    );

  const authorizationResult = await new FactCheckSessionService().authoirze({
    factCheckSessionId,
    ownerId: userId,
  });
  if (isFailure(authorizationResult)) {
    const { code, error } = authorizationResult;
    return handleRouteError(code, error, 401);
  }

  const subtitle = await YoutubeService.downloadSubtitle(contentId);
  const claimService = new ClaimService(req.signal);

  return streamResponse(({ send, close }) => {
    claimService
      .onClaimDetected((claim) => {
        send(claim satisfies CreateClaimsResponseDto);
      })
      .onFinished(async (claims) => {
        await claimRepo.createMany(factCheckSessionId, claims);
        close();
      })
      .onError((error) => {
        console.error(error);
        close();
      })
      .startDetection(subtitle);
  }, req.signal);
}
