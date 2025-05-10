import loadConfig from '@/config';
import { PageRoutes } from '@/constants/routes';
import { upsertUser } from '@/repository/user';
import { authService } from '@/service';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    console.error('state or code is not provided');
    return NextResponse.redirect(PageRoutes.error.AUTH);
  }

  const { tokens, providerSub, email } = await authService.authenticate(code);

  await upsertUser({
    email,
    providerSub,
    refreshToken: tokens.refreshToken,
  });

  cookies().set({
    name: 'access-token',
    value: tokens.accessToken,
    secure: loadConfig().nodeEnv === 'production',
    sameSite: 'strict',
  });

  const res = NextResponse.redirect(
    generateServerUrl(`${PageRoutes.OAUTH_CALLBACK}?state=${state}`),
    {
      status: 302,
    },
  );

  res.cookies.set({
    name: 'access-token',
    value: tokens.accessToken,
    secure: loadConfig().nodeEnv === 'production',
    sameSite: 'strict',
  });

  return res;
}
