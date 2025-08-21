'use client';
import { YoutubeVideo } from '@/models/youtube';
import FactCheckList from './FactCheckList';
import YoutubeVideoInfoCard from './YoutubeVideoInfoCard/YoutubeVideoInfoCard';
import { useClaim } from '../providers/ClaimProvider';

interface Props {
  video: YoutubeVideo;
}

// TODO: 자막 생성 최적화
export default function FactCheckContent({ video }: Props) {
  const { videoSummary, status } = useClaim();

  return (
    <div className="flex flex-col gap-y-12">
      <YoutubeVideoInfoCard
        className="mx-12"
        video={{ ...video, summary: videoSummary }}
        isSummaryLoading={status === 'videoSummarizing'}
      />

      <FactCheckList className="mx-12" />
    </div>
  );
}
