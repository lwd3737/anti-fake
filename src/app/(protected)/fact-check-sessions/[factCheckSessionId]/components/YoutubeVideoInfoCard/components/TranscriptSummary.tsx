import LoadingSpinner from '@/components/LoadingSpinner';

interface Props {
  isLoading: boolean;
  summary?: string;
}

export default function TranscriptSummary({ isLoading, summary }: Props) {
  return (
    <div className="flex flex-col gap-y-2 max-h-[30vh] overflow-y-auto">
      <h6 className="font-medium text-sm">요약</h6>
      <p className="text-gray-500 text-sm">
        {isLoading ? <LoadingSpinner width={24} height={24} /> : summary}
      </p>
    </div>
  );
}
