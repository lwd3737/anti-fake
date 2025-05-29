import { setAccessTokenCookie } from '@/app/api/auth/set-access-token-cookie/fetch';
import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { User } from '@/models/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const guardServerAuth = async (
  req?: NextRequest,
): Promise<
  | ({
      isAuthenticated: true;
      response: (args: Parameters<typeof NextResponse.json>) => NextResponse;
    } & Pick<User, 'providerSub'>)
  | { isAuthenticated: false; response: NextResponse }
> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return {
      isAuthenticated: true,
      response: (args) => NextResponse.json(args),
      providerSub: 'mock-provider-sub',
    };

  const accessToken = cookies().get(CookieNames.ACCESS_TOKEN)?.value;
  if (!accessToken)
    return {
      isAuthenticated: false,
      response: NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN)),
    };

  const authenticateResult = await authService.authenticate(accessToken);
  if (isFailure(authenticateResult))
    return {
      isAuthenticated: false,
      response: NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN)),
    };

  const { isVerified, providerSub } = authenticateResult;
  if (!isVerified) {
    try {
      const refreshResult = await authService.refresh(providerSub);
      if (isFailure(refreshResult)) {
        return {
          isAuthenticated: false,
          response: NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN)),
        };
      }

      const { accessToken } = refreshResult;
      if (req) req.cookies.set(CookieNames.ACCESS_TOKEN, accessToken);
      else await setAccessTokenCookie(accessToken);

      return {
        isAuthenticated: true,
        response: responseWithAuth,
        providerSub,
      };
    } catch (e) {
      return {
        isAuthenticated: false,
        response: NextResponse.redirect(PageRoutes.LOGIN),
      };
    }
  }

  return { isAuthenticated: true, response: responseWithAuth, providerSub };
};

export const responseWithAuth = (
  args: Parameters<typeof NextResponse.json>,
): NextResponse => {
  const accessToken = cookies().get(CookieNames.ACCESS_TOKEN)?.value;
  if (!accessToken)
    return NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));

  const res = NextResponse.json(args);
  res.cookies.set(CookieNames.ACCESS_TOKEN, accessToken);
  return res;
};
