import Image from 'next/image';

export default function LoginLoading() {
  return (
    <main className="flex flex-col items-center justify-center h-full gap-y-12 p-14">
      <div className="flex flex-col items-center">
        <Image
          className="animate-spin"
          src="/icons/loading.svg"
          alt="loading"
          width={64}
          height={64}
        />
        <h1 className="mt-8 mb-2 text-2xl font-medium">로그인 중입니다</h1>
        <p className="text-[#6B7280]">잠시만 기다려 주세요...</p>
      </div>
    </main>
  );
}
