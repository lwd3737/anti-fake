import { APIRoutes } from '@/constants/routes';
import { GenerateOauthUrlResponseDto } from '@/gateway/dto/auth';
import apiClient from '../../client';
import { Result } from '@/result';
import { ErrorCode } from '@/gateway/error/error-code';

export async function generateOauthUrl(): Promise<
  Result<GenerateOauthUrlResponseDto, ErrorCode.UNAUTHENTICATED>
> {
  const res = await apiClient(APIRoutes.auth.OAUTH_URL, {
    method: 'POST',
  });

  const csrfToken = res.headers.get('x-csrf-token');
  if (!csrfToken) throw new Error('CSRF token not found');

  sessionStorage.setItem('csrf-token', csrfToken);

  return await res.json();
}
