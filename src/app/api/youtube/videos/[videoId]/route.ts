import { CookieNames } from '@/constants/cookie';
import { ErrorCode } from '@/gateway/error/error-code';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { authService } from '@/services';
import YoutubeService from '@/services/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } },
) {
  const { videoId } = params;

  const cookieStore = req.cookies;
  const accessTokenCookie = cookieStore.get(CookieNames.ACCESS_TOKEN);
  if (!accessTokenCookie) {
    return handleRouteError(
      ErrorCode.UNAUTHORIZATION,
      'Access token not found',
      401,
    );
  }

  authService.setTokens({ accessToken: accessTokenCookie.value });

  const youtube = YoutubeService.create(authService);

  try {
    const video = await youtube.getVideo(videoId);

    return NextResponse.json(video);
  } catch (e) {
    const error = e as Error;

    return handleRouteError(
      ErrorCode.YOUTUBE_VIDEO_GET_FAILED,
      error.message,
      500,
    );
  }
}
