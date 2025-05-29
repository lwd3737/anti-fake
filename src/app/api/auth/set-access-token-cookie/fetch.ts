export const setAccessTokenCookie = async (
  accessToken: string,
): Promise<{ ok: true }> => {
  const res = await fetch('/api/auth/set-access-token-cookie', {
    method: 'POST',
    body: JSON.stringify({ accessToken }),
  });
  return await res.json();
};
