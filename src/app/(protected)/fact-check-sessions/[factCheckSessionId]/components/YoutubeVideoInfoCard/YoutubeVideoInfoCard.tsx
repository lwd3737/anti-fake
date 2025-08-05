import { formatDate } from '@/utils/date';
import Image from 'next/image';
import FactCheckProgressDisplay from './components/FactCheckProgressDisplay';
import VideoThumbnailLink from './components/VideoThumbnailLink';
import TranscriptSummary from './components/TranscriptSummary';
import { YoutubeVideo } from '@/models/youtube';

interface Props {
  video: YoutubeVideo;
  isSummaryLoading: boolean;
  className?: string;
}

export default function YoutubeVideoInfoCard({
  video,
  isSummaryLoading,
  className,
}: Props) {
  const { thumbnailUrl, title, channelTitle, transcriptSummary, publishedAt } =
    video;

  return (
    <div className={`bg-white shadow-sm p-6 rounded-sm ${className}`}>
      <div className="flex gap-x-4">
        <VideoThumbnailLink
          url={thumbnailUrl}
          width={120}
          height={120}
          videoId={video.id}
        />

        <div className="flex-1">
          <div>
            <h1 className="pb-2 font-bold text-xl">{title}</h1>
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
          </div>
          <div className="mt-4">
            <FactCheckProgressDisplay />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 mt-4 p-4 rounded-lg">
        {transcriptSummary && (
          <TranscriptSummary
            isLoading={isSummaryLoading}
            summary={transcriptSummary}
          />
        )}
      </div>
    </div>
  );
}
