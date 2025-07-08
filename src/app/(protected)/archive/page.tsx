import { PageRoutes } from '@/constants/routes';
import { guardServer } from '@/gateway/auth/guard-server';
import { isFailure } from '@/result';
import FactCheckSessionService from '@/services/fact-check-session';
import { formatDate } from '@/utils/date';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArchivePage() {
  const { user } = await guardServer();

  const archiveResult = await new FactCheckSessionService().getArchive({
    userId: user.id,
  });
  if (isFailure(archiveResult)) {
    return <div>Error: {archiveResult.message}</div>;
  }

  const archive = archiveResult;
  return (
    <ul className="gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {archive.map(
        ({ id, video, claimCount, verificationCount, createdAt }) => {
          return (
            <li
              className="bg-white shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300"
              key={id}
            >
              <Link href={PageRoutes.factCheckSession(id)}>
                <div className="flex gap-x-4 px-8 py-4">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={150}
                    height={150}
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="font-semibold text-base">{video.title}</h2>
                    <div className="flex flex-col gap-y-1 text-gray-500 text-sm">
                      <span>{video.channelTitle}</span>
                      <span>게시일: {formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between bg-gray-50 px-8 py-4">
                  <div className="flex gap-x-3 text-gray-600 text-base">
                    <span className="font-semibold text-brand">
                      주장 {claimCount}개
                    </span>
                    <span className="font-semibold text-yellow-800">
                      검증 {verificationCount}/{claimCount}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </Link>
            </li>
          );
        },
      )}
    </ul>
  );
}
