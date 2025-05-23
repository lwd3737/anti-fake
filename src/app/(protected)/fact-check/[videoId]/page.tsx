import FactCheckList from './components/FactCheckList';
import ControlHorizontalBar from './components/ControlHorizontalBar';
import YoutubeVideoInfoCard from './components/YoutubeVideoInfoCard/YoutubeVideoInfoCard';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import { ContentType } from '@/models/fact-check-session';
import userRepo from '@/repositories/user';
import { OauthProviderType } from '@/models/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PageRoutes } from '@/constants/routes';
import { CookieNames } from '@/constants/cookie';

export default async function FactCheckPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const providerSub = cookies().get(CookieNames.PROVIDER_SUB)?.value!;

  const user = await userRepo.findByProviderSub({
    provider: OauthProviderType.GOOGLE,
    providerSub,
  });
  if (!user) {
    console.error('User not found');
    return redirect(PageRoutes.LOGIN);
  }
  const factCheckSession =
    (await factCheckSessionRepo.findByUserAndContent({
      userId: user.id,
      contentType: ContentType.YOUTUBE_VIDEO,
      contentId: videoId,
    })) ??
    (await factCheckSessionRepo.create({
      userId: user.id,
      contentType: ContentType.YOUTUBE_VIDEO,
      contentId: videoId,
    }));

  // TODO: card 공통 컴포넌트 추출
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-col flex-[1_1_0px] gap-y-8 mb-16 py-8 overflow-y-auto">
        <YoutubeVideoInfoCard className="mx-12" videoId={videoId} />
        <FactCheckList className="mx-12" factCheckSession={factCheckSession} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 z-200">
        <ControlHorizontalBar />
      </footer>
    </div>
  );
}
