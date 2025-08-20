import { guardServer } from '@/gateway/auth/guard-server';
import { isFailure } from '@/result';
import FactCheckSessionService from '@/services/fact-check-session';
import FactCheckSessionCard from './components/FactCheckSessionCard';

export default async function ArchivePage() {
  const { user } = await guardServer();

  const archiveResult = await new FactCheckSessionService().getArchive({
    userId: user.id,
  });
  if (isFailure(archiveResult)) {
    return <div>Error: {archiveResult.message}</div>;
  }

  const handleRemove = async (id: string) => {
    'use server';

    const result = await new FactCheckSessionService().delete(id);
    if (isFailure(result)) {
      return <div>Error: {result.message}</div>;
    }
  };

  const archive = archiveResult;

  return archive.length > 0 ? (
    <ul className="gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {archive.map((factCheckSession) => (
        <FactCheckSessionCard
          key={factCheckSession.id}
          {...factCheckSession}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  ) : (
    <div className="py-10 text-gray-500 text-sm text-center">
      기록이 없습니다
    </div>
  );
}
