import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { User } from '@/models/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const guardRouteHandler = async (
  req: NextRequest,
): Promise<
  | ({ isAuthenticated: true } & Pick<User, 'providerSub'>)
  | { isAuthenticated: false; redirect: () => NextResponse }
> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return {
      isAuthenticated: true,
      providerSub: 'mock-provider-sub',
    };

  const accessToken = cookies().get(CookieNames.ACCESS_TOKEN)?.value;
  if (!accessToken)
    return {
      isAuthenticated: false,
      redirect: createRedirect(),
    };

  const authenticateResult = await authService.authenticate(accessToken);
  if (isFailure(authenticateResult))
    return {
      isAuthenticated: false,
      redirect: createRedirect(),
    };

  const { isVerified, providerSub } = authenticateResult;
  if (!isVerified) {
    try {
      const refreshResult = await authService.refresh(providerSub);
      if (isFailure(refreshResult))
        return {
          isAuthenticated: false,
          redirect: createRedirect(),
        };

      const { accessToken } = refreshResult;
      cookies().set(CookieNames.ACCESS_TOKEN, accessToken);

      return {
        isAuthenticated: true,
        providerSub,
      };
    } catch (e) {
      return {
        isAuthenticated: false,
        redirect: createRedirect(),
      };
    }
  }

  return { isAuthenticated: true, providerSub };
};

const createRedirect = (): (() => NextResponse) => {
  return () => NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));
};
