interface Props {
  videoId: string;
  summary: string;
}

export default async function TranscriptSummary({ videoId, summary }: Props) {
  return (
    <div className="flex flex-col gap-y-2 max-h-[30vh] overflow-y-auto">
      <h6 className="font-medium text-sm">요약</h6>
      <p className="text-gray-500 text-sm">{summary}</p>
    </div>
  );
}
