import { APIRoutes } from '@/constants/routes';
import { VerifyTokenResponseDto } from '@/dto/auth';
import apiClient from '../../client';

export async function verifyAccessToken(
  accessToken: string,
): Promise<VerifyTokenResponseDto> {
  const res = await apiClient(APIRoutes.auth.VERIFY_TOKEN, {
    isServer: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
  });

  return await res.json();
}
