'use client';
import { PageRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // router.replace(PageRoutes.LOGIN);
    }, 3000);
  }, [router]);

  return (
    <main>
      <h1>인증 오류</h1>
      <p>인증에 실패했습니다. 3초 뒤에 로그인 페이지로 이동합니다.</p>
    </main>
  );
}
