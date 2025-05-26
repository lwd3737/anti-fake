import { APIRoutes } from '@/constants/routes';
import { GenerateOauthUrlResponseDto } from '@/gateway/dto/auth';
import apiClient from '../../client';

export async function generateOauthUrl(): Promise<GenerateOauthUrlResponseDto> {
  const res = await apiClient(APIRoutes.auth.OAUTH_URL, {
    method: 'POST',
  });

  const csrfToken = res.headers.get('x-csrf-token');
  if (!csrfToken) throw new Error('CSRF token not found');

  sessionStorage.setItem('csrf-token', csrfToken);

  return await res.json();
}
