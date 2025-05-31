import { setAccessTokenCookie } from '@/app/api/auth/set-access-token-cookie/fetch';
import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { User } from '@/models/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const guardServer = async (): Promise<Pick<User, 'providerSub'>> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return {
      providerSub: 'mock-provider-sub',
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

      const { accessToken } = refreshResult;
      setAccessTokenCookie(accessToken);

      return {
        providerSub,
      };
    } catch (e) {
      return redirect(generateServerUrl(PageRoutes.LOGIN));
    }
  }

  return { providerSub };
};
