import { CookieNames } from '@/constants/cookie';
import { CreateClaimsRequestDto, GetClaimsResponseDto } from '@/dto/claim';
import { CreateClaimsResponseDto } from '@/dto/fact-check';
import { ErrorCode } from '@/error/error-code';
import { handleRouteError } from '@/error/reponse-error-handler';
import { streamResponse } from '@/helpers/stream-response';
import { ContentType } from '@/models/fact-check-session';
import { OauthProviderType } from '@/models/user';
import claimRepo from '@/repositories/claim';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import userRepo from '@/repositories/user';
import ClaimService from '@/services/claim';
import YoutubeService from '@/services/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params: { factCheckSessionId },
  }: { params: { factCheckSessionId: string } },
) {
  const providerSub = req.cookies.get(CookieNames.PROVIDER_SUB)!.value;
  const user = await userRepo.findByProviderSub({
    provider: OauthProviderType.GOOGLE,
    providerSub,
  });
  if (!user) {
    return handleRouteError(ErrorCode.UNAUTHENTICATED, 'User not found', 401);
  }

  const factCheckSession =
    await factCheckSessionRepo.findById(factCheckSessionId);
  if (!factCheckSession) {
    return handleRouteError(
      ErrorCode.FACT_CHECK_SESSION_NOT_FOUND,
      'Fact check session not found',
      404,
    );
  }

  if (factCheckSession.userId !== user.id) {
    return handleRouteError(
      ErrorCode.UNAUTHORIZATION,
      "User is not factcheck session's owner",
      401,
    );
  }

  const claims = await claimRepo.findManyBySessionId(factCheckSession.id);

  return NextResponse.json({ claims } as GetClaimsResponseDto);
}

export async function POST(req: NextRequest) {
  const { factCheckSessionId, userId, contentType, contentId } =
    (await req.json()) as CreateClaimsRequestDto;
  // TODO: Add more content types
  if (contentType !== ContentType.YOUTUBE_VIDEO)
    return handleRouteError(
      ErrorCode.CONTENT_TYPE_NOT_SUPPORTED,
      'Only YouTube videos are supported',
      400,
    );
  // TODO: 권한 검증

  const subtitle = await YoutubeService.downloadSubtitle(contentId);
  const claimDetector = new ClaimService(req.signal);

  return streamResponse(({ send, close }) => {
    claimDetector
      .onClaimDetected((claim) => {
        send(claim satisfies CreateClaimsResponseDto);
      })
      .onFinished(() => {
        close();
      })
      .onError((error) => {
        console.error(error);
        close();
      })
      .startDetection(subtitle);
  }, req.signal);
}
