'use client';

import { redirect, RedirectType } from 'next/navigation';
import { PageRoutes } from '@/constants/routes';
import { useEffect } from 'react';
import LoginLoading from './components/loading';

export default function OauthCallbackPage({
  searchParams,
}: {
  searchParams: { state: string };
}) {
  useEffect(() => {
    const { state } = searchParams;
    if (!state) {
      console.error('state is not provided');
      redirect(PageRoutes.error.AUTH);
    }

    const csrfToken = sessionStorage.getItem('csrf-token');
    if (!csrfToken) {
      console.error('csrf-token is not found');
      redirect(PageRoutes.error.AUTH);
    }

    if (state !== csrfToken) {
      console.error('state does not match csrf-token');
      redirect(PageRoutes.error.AUTH);
    }

    redirect(PageRoutes.HOME, RedirectType.replace);
  }, [searchParams]);

  return <LoginLoading />;
}
