import { isFailure } from '@/result';
import YoutubeService from '@/services/youtube';

interface Props {
  videoId: string;
}

export default async function TranscriptSummary({ videoId }: Props) {
  const summaryResult = await new YoutubeService().summarizeTranscript(videoId);
  if (isFailure(summaryResult)) {
    const error = summaryResult;
    console.debug(error);
    return <p>요약 중 오류가 발생했습니다.</p>;
  }

  const summary = summaryResult;

  return (
    <div className="flex flex-col gap-y-2 max-h-[30vh] overflow-y-auto">
      <h6 className="font-medium text-sm">요약</h6>
      <p className="text-gray-500 text-sm">{summary}</p>
    </div>
  );
}
