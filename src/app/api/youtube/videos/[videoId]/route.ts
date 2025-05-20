import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { ErrorCode } from '@/error/error-code';
import { handleRouteError } from '@/error/reponse-error-handler';
import { authService } from '@/services';
import YoutubeService from '@/services/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { videoId: string } },
) {
  const { videoId } = params;

  const cookieStore = req.cookies;
  const accessTokenCookie = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
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
