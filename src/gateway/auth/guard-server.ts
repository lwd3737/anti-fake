import { setAccessTokenCookie } from '@/app/api/auth/set-access-token-cookie/fetch';
import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { OauthProviderType, User, UserRole } from '@/models/user';
import userRepo from '@/repositories/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const guardServer = async (): Promise<{ user: User }> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return {
      user: {
        id: 'mock-user-id',
        provider: OauthProviderType.GOOGLE,
        providerSub: 'mock-provider-sub',
        email: 'mock-email',
        role: UserRole.ADMIN,
        refreshToken: 'mock-refresh-token',
      } as User,
    };

  const accessToken = cookies().get(CookieNames.ACCESS_TOKEN)?.value;
  if (!accessToken) {
    console.debug('ACCESS_TOKEN cookie not found');
    return redirect(generateServerUrl(PageRoutes.LOGIN));
  }

  const authenticateResult = await authService.authenticate(accessToken);
  if (isFailure(authenticateResult))
    return redirect(generateServerUrl(PageRoutes.LOGIN));

  const { isVerified, providerSub } = authenticateResult;
  if (!isVerified) {
    try {
      const refreshResult = await authService.refresh(providerSub);
      if (isFailure(refreshResult))
        return redirect(generateServerUrl(PageRoutes.LOGIN));

      const jwt = refreshResult;
      setAccessTokenCookie(jwt);

      return {
        user: await getUserOrRedirect(providerSub),
      };
    } catch (e) {
      return redirect(generateServerUrl(PageRoutes.LOGIN));
    }
  }

  return { user: await getUserOrRedirect(providerSub) };
};

const getUserOrRedirect = async (providerSub: string) => {
  const user = await userRepo.findByProviderSub({
    provider: OauthProviderType.GOOGLE,
    providerSub,
  });
  if (!user) {
    console.error('User not found');
    return redirect(PageRoutes.LOGIN);
  }
  return user;
};
