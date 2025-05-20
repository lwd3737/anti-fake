import { NextRequest, NextResponse } from 'next/server';
import { APIRoutes, PageRoutes } from './constants/routes';
import { generateServerUrl } from './utils/url';
import loadConfig from './config';
import { verifyAccessToken } from './app/api/auth/verify-token/fetch';

declare module 'next/server' {
  interface NextRequest {
    providerSub?: string;
  }
}

export async function middleware(req: NextRequest) {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode) return NextResponse.next();

  if (isPublic(req.nextUrl.pathname)) return NextResponse.next();

  const accessTokenCookie = req.cookies.get('access-token');
  if (!accessTokenCookie) {
    console.debug('access-token cookie is not provided');
    return NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));
  }

  const { isVerified, providerSub } = await verifyAccessToken(
    accessTokenCookie.value,
  );
  if (!isVerified) {
    req.cookies.delete('access-token');
    return NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));
  }

  req.cookies.set('providerSub', providerSub!);

  return NextResponse.next();
}

const isPublic = (pathname: string): boolean => {
  const staticPath = /^\/_next\/.*/;
  if (staticPath.test(pathname)) return true;

  const routes = [
    PageRoutes.error.AUTH,
    PageRoutes.LOGIN,
    PageRoutes.OAUTH_CALLBACK,
    APIRoutes.auth.OAUTH_URL,
    APIRoutes.auth.OAUTH_CALLBACK,
    APIRoutes.auth.VERIFY_TOKEN,
    APIRoutes.auth.GENERATE_TOKENS,
  ];
  return routes.includes(pathname);
};
