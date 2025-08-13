'use client';
import { YoutubeVideo } from '@/models/youtube';
import FactCheckList from './FactCheckList';
import YoutubeVideoInfoCard from './YoutubeVideoInfoCard/YoutubeVideoInfoCard';
import { useClaim } from '../providers/ClaimProvider.new';
import { ErrorCode } from '@/gateway/error/error-code';

interface Props {
  video: YoutubeVideo;
}

// TODO: 자막 생성 최적화
export default function FactCheckContent({ video }: Props) {
  const { videoSummary, status } = useClaim();

  const isSummaryLoading = status === 'streaming' && !videoSummary;

  return (
    <div className="flex flex-col gap-y-12">
      <YoutubeVideoInfoCard
        className="mx-12"
        video={{ ...video, summary: videoSummary }}
        isSummaryLoading={isSummaryLoading}
      />

      <FactCheckList className="mx-12" />
    </div>
  );
}
