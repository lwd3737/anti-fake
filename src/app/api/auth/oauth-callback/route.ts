import loadConfig from '@/config';
import { PageRoutes } from '@/constants/routes';
import { OauthProviderType } from '@/models/user';
import AuthRepo from '@/repositories/auth';
import userRepo from '@/repositories/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    console.error('state or code is not provided');
    return NextResponse.redirect(PageRoutes.error.AUTH);
  }

  const authorizeResult = await authService.authorizeCode(code);
  if (isFailure(authorizeResult)) {
    return NextResponse.redirect(PageRoutes.error.AUTH);
  }

  const { tokens, providerSub, email } = authorizeResult;

  await userRepo.upsert({
    email,
    provider: OauthProviderType.GOOGLE,
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
