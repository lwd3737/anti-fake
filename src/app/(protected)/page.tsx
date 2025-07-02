import Image from 'next/image';
import YoutubeVideoUrlForm from './components/YoutubeVideoUrlForm';
import { guardServer } from '@/gateway/auth/guard-server';

export default async function Home() {
  const { user } = await guardServer();

  return (
    <main className="flex justify-center px-20 py-8 h-full">
      <div className="bg-white shadow-sm p-10 rounded-lg w-full h-full">
        <div className="flex flex-col gap-y-5 text-center">
          <h1 className="flex justify-center items-center gap-x-3 font-bold text-3xl">
            <Image
              src="/icons/youtube-logo.svg"
              alt="youtube logo"
              width={32}
              height={32}
            />
            <span>유튜브 비디오 팩트체크</span>
          </h1>
          <p className="text-[#6B7280]">
            유튜브 비디오 링크를 입력하면, 영상의 사실 여부를 알려드립니다.
          </p>
        </div>

        <YoutubeVideoUrlForm user={user} />
      </div>
    </main>
  );
}
