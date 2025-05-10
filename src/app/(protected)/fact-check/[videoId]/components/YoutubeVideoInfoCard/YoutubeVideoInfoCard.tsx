import { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { PageRoutes } from '@/constants/routes';
import YoutubeService from '@/service/youtube';
import { formatDate } from '@/utils/date';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import FactCheckProgressDisplay from './components/FactCheckProgressDisplay';
import VideoThumbnailLink from './components/VideoThumbnailLink';
import { isGoogleApisError } from '@/error/google-apis-error';
import { authService } from '@/service';

interface Props {
  videoId: string;
  className?: string;
}

export default async function YoutubeVideoInfoCard({
  videoId,
  className,
}: Props) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
  if (!accessToken) {
    return redirect(PageRoutes.LOGIN);
  }

  authService.setTokens({ accessToken: accessToken.value });

  const youtube = YoutubeService.create(authService);

  const videoResult = await youtube.getVideo(videoId);
  if (isGoogleApisError(videoResult)) {
    const { code, status } = videoResult;
    switch (status) {
      case 401:
        return redirect(PageRoutes.LOGIN);
      default:
        throw new Error(
          `Google API Error: ${code} ${status} ${videoResult.message}`,
        );
    }
  }
  const { thumbnail, title, channelTitle, publishedAt } = videoResult;

  return (
    <div
      className={`flex gap-x-4 bg-white shadow-sm p-6 rounded-sm ${className}`}
    >
      <VideoThumbnailLink {...thumbnail} videoId={videoId} />

      <div className="flex-1">
        <h1 className="pb-2 text-xl font-bold">{title}</h1>
        <div className="flex gap-x-5 text-[#6B7280] text-[0.875rem]">
          <span className="flex items-center gap-x-1">
            <Image
              src="/icons/profile.svg"
              alt="channel icon"
              width={12}
              height={12}
            />
            <small>{channelTitle}</small>
          </span>
          <span className="flex items-center gap-x-1">
            <Image
              src="/icons/clock.svg"
              alt="published date"
              width={12}
              height={12}
            />
            {formatDate(new Date(publishedAt))}
          </span>
        </div>
        <div className="py-4">
          <FactCheckProgressDisplay />
        </div>
      </div>
    </div>
  );
}
