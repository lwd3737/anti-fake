import loadConfig from '@/config';
import { CookieNames } from '@/constants/cookie';
import { PageRoutes } from '@/constants/routes';
import { User } from '@/models/user';
import { isFailure } from '@/result';
import { authService } from '@/services';
import { generateServerUrl } from '@/utils/url';
import { NextRequest, NextResponse } from 'next/server';

export const authGuard = async (
  req: NextRequest,
): Promise<
  | ({ isAuthenticated: true } & Pick<User, 'providerSub'>)
  | { isAuthenticated: false; response: NextResponse }
> => {
  const { authInactiveMode } = loadConfig();
  if (authInactiveMode)
    return { isAuthenticated: true, providerSub: 'mock-provider-sub' };

  const accessToken = req.cookies.get(CookieNames.ACCESS_TOKEN)?.value;
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
      req.cookies.set(CookieNames.ACCESS_TOKEN, accessToken);

      return { isAuthenticated: true, providerSub };
    } catch (e) {
      return {
        isAuthenticated: false,
        response: NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN)),
      };
    }
  }

  return { isAuthenticated: true, providerSub };
};
