import { PageRoutes } from '@/constants/routes';
import { ContentType } from '@/models/fact-check-session';
import { User } from '@/models/user';
import factCheckSessionRepo from '@/repositories/fact-check-session';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function YoutubeVideoUrlForm({ user }: { user: User }) {
  const getOrCreateFactCheckSession = async (formData: FormData) => {
    'use server';
    const videoUrl = formData.get('videoUrl');
    if (!videoUrl) return;

    const url = new URL(videoUrl as string);
    if (
      (url.host !== 'www.youtube.com' || url.pathname !== '/watch',
      !url.searchParams.get('v'))
    ) {
      throw new Error('유튜브 URL 형식이 아닙니다. 다시 입력해주세요.');
    }

    const videoId = url.searchParams.get('v');
    if (!videoId) return;

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

    return redirect(PageRoutes.factCheckSession(factCheckSession.id));
  };

  return (
    <form
      className="flex flex-col gap-y-10 py-8"
      action={getOrCreateFactCheckSession}
    >
      <input
        className="bg-gray-50 px-5 py-6 border border-1 border-gray-300 border-solid rounded-md w-full"
        type="text"
        name="videoUrl"
        placeholder="https://www.youtube.com/watch?v=..."
      />

      <button className="flex justify-center items-center gap-x-2 bg-brand p-5 rounded-lg w-full font-semibold text-[1.125rem] text-white">
        <Image
          src="/icons/search.svg"
          alt="start fectcheck"
          width={18}
          height={18}
        />
        <span>팩트체크 시작하기</span>
      </button>
    </form>
  );
}
