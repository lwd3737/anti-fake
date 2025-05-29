import { APIRoutes } from '@/constants/routes';

export const setAccessTokenCookie = async (
  accessToken: string,
): Promise<{ ok: true }> => {
  const res = await fetch(APIRoutes.auth.SET_ACCESS_TOKEN_COOKIE, {
    method: 'POST',
    body: JSON.stringify({ accessToken }),
  });
  return await res.json();
};
