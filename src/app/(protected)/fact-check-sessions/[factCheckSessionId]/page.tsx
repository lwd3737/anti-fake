import FactCheckList from './components/FactCheckList';
import ControlHorizontalBar from './components/ControlHorizontalBar';
import YoutubeVideoInfoCard from './components/YoutubeVideoInfoCard/YoutubeVideoInfoCard';
import FactCheckSessionProviders from './providers/providers';
import { guardServer } from '@/gateway/auth/guard-server';
import YoutubeService from '@/services/youtube';
import { isFailure } from '@/result';
import FactCheckSessionService from '@/services/fact-check-session';

export default async function FactCheckSessionPage({
  params: { factCheckSessionId },
}: {
  params: { factCheckSessionId: string };
}) {
  const { user } = await guardServer();

  const sessionResult = await new FactCheckSessionService().getOwn({
    factCheckSessionId,
    userId: user.id,
  });
  if (isFailure(sessionResult)) {
    const error = sessionResult;
    console.debug('Fact check session get failed', error);
    throw new Error(error.message);
  }

  const session = sessionResult;
  const videoResult = await new YoutubeService().getOrCreateVideo(
    session.contentId,
  );
  if (isFailure(videoResult)) {
    const failure = videoResult;
    console.debug('Youtube video get or create failed', failure);
    // TODO: 에러 핸들링 추가
    return 'Youtube video get or create failed';
  }

  const video = videoResult;

  // TODO: card 공통 컴포넌트 추출
  return (
    <FactCheckSessionProviders factCheckSession={session}>
      <div className="flex flex-col h-full">
        <main className="flex flex-col flex-[1_1_0px] gap-y-8 mb-16 py-8 overflow-y-auto">
          <YoutubeVideoInfoCard className="mx-12" video={video} />
          <FactCheckList className="mx-12" factCheckSession={session} />
        </main>

        <footer className="right-0 bottom-0 left-0 z-200 fixed h-16">
          <ControlHorizontalBar />
        </footer>
      </div>
    </FactCheckSessionProviders>
  );
}
