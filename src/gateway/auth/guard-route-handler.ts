import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { OauthProviderType, User, UserRole } from '@/models/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import userRepo from '@/repositories/user';

export const guardRouteHandler = async (): Promise<
  | ({ isAuthenticated: true } & { user: User })
  | { isAuthenticated: false; redirect: () => NextResponse }
> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return {
      isAuthenticated: true,
      user: {
        providerSub: 'mock-provider-sub',
        provider: OauthProviderType.GOOGLE,
        id: 'mock-id',
        email: 'mock-email',
        role: UserRole.USER,
        refreshToken: 'mock-refresh-token',
      },
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
  const user = await userRepo.findByProviderSub({
    provider: OauthProviderType.GOOGLE,
    providerSub,
  });
  if (!user) {
    return {
      isAuthenticated: false,
      redirect: createRedirect(),
    };
  }

  if (!isVerified) {
    try {
      const refreshResult = await authService.refresh(providerSub);
      if (isFailure(refreshResult))
        return {
          isAuthenticated: false,
          redirect: createRedirect(),
        };

      const jwt = refreshResult;
      cookies().set(CookieNames.ACCESS_TOKEN, jwt);

      return {
        isAuthenticated: true,
        user,
      };
    } catch (e) {
      return {
        isAuthenticated: false,
        redirect: createRedirect(),
      };
    }
  }

  return {
    isAuthenticated: true,
    user,
  };
};

const createRedirect = (): (() => NextResponse) => {
  return () => NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));
};
