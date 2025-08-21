import LoadingSpinner from '@/components/LoadingSpinner';

interface Props {
  isLoading: boolean;
  summary?: string | null;
}

export default function VideoSummary({ isLoading, summary }: Props) {
  return (
    <div className="flex flex-col gap-y-2 max-h-[30vh] overflow-y-auto">
      {!isLoading && <h6 className="font-medium text-sm">요약</h6>}
      <p className="text-gray-500 text-sm">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner width={24} height={24} />
          </div>
        ) : (
          summary
        )}
      </p>
    </div>
  );
}
