import { PageRoutes } from '@/constants/routes';
import { guardServer } from '@/gateway/auth/guard-server';
import youtubeRepo from '@/repositories/youtube';
import { isFailure } from '@/result';
import FactCheckSessionService from '@/services/fact-check-session';
import YoutubeService from '@/services/youtube';
import Image from 'next/image';
import Link from 'next/link';

export default async function ArchivePage() {
  const { user } = await guardServer();

  const factCheckSessions = await new FactCheckSessionService().findAllByUserId(
    {
      userId: user.id,
    },
  );
  if (isFailure(factCheckSessions)) {
    return <div>Error: {factCheckSessions.message}</div>;
  }

  const videoIds = factCheckSessions.map(({ contentId }) => contentId);
  const videos = await youtubeRepo.getVideos(videoIds);

  return (
    <ul className="gap-x-6 gap-y-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-8">
      {factCheckSessions.map(({ id, contentId }, idx) => {
        const video = videos[idx];
        if (video.id !== contentId) throw new Error('Video ID mismatch');

        return (
          <li
            className="bg-white shadow-md hover:shadow-lg p-4 rounded-lg transition-shadow duration-300"
            key={id}
          >
            <Link href={PageRoutes.factCheckSession(id)}>
              <div className="flex gap-x-4">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={150}
                  height={150}
                />
                <div className="flex flex-col justify-between">
                  <h2 className="font-semibold text-base">{video.title}</h2>
                  <div className="flex flex-col gap-y-1 text-gray-500 text-sm">
                    <small>{video.channelTitle}</small>
                    <small>{video.publishedAt.toLocaleDateString()}</small>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
