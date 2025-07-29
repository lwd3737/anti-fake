'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import { useState } from 'react';

export default function FactCheckStartButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    setIsLoading(true);
  };

  return (
    <button
      className={`flex justify-center items-center gap-x-2 bg-brand p-5 rounded-lg w-full font-semibold text-[1.125rem] text-white ${isLoading ? 'opacity-50 bg-gray-400 cursor-not-allowed' : ''}`}
      type="submit"
      // disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <>
          <LoadingSpinner width={18} height={18} />
          <span>세션 생성 중...</span>
        </>
      ) : (
        <>
          <Image
            src="/icons/search.svg"
            alt="start fectcheck"
            width={18}
            height={18}
          />
          <span>팩트체크 시작하기</span>
        </>
      )}
    </button>
  );
}
