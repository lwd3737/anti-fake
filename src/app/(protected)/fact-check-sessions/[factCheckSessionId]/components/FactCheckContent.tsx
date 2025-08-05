'use client';
import { YoutubeVideo } from '@/models/youtube';
import FactCheckList from './FactCheckList';
import YoutubeVideoInfoCard from './YoutubeVideoInfoCard/YoutubeVideoInfoCard';
import { useEffect, useState } from 'react';
import { isFailure } from '@/result';
import { generateTranscript } from '@/app/api/youtube/transcript/fetch';

interface Props {
  video: YoutubeVideo;
}

// TODO: 자막 생성 최적화
export default function FactCheckContent({ video }: Props) {
  const [transcriptSummary, setTranscriptSummary] = useState<string | null>(
    video.transcriptSummary ?? null,
  );
  const [transcriptError, setTranscriptError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (transcriptSummary) return;

      console.log('generate transcript');
      setIsLoading(true);
      generateTranscript(video.id)
        .then((result) => {
          if (isFailure(result)) {
            const failure = result;
            setTranscriptError(failure.message);
            return;
          }

          const transcript = result;
          setTranscriptSummary(transcript.summary);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    },
    [transcriptSummary, video.id],
  );

  return (
    <div className="flex flex-col gap-y-12">
      <YoutubeVideoInfoCard
        className="mx-12"
        video={{ ...video, transcriptSummary }}
        isSummaryLoading={isLoading}
      />

      <FactCheckList className="mx-12" />
      {transcriptError && <div className="text-red-500">{transcriptError}</div>}
    </div>
  );
}
