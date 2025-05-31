import { ErrorCode } from '@/gateway/error/error-code';
import AuthRepo from '@/repositories/auth';
import { Result } from '@/result';

export default class AuthService {
  private authRepo = new AuthRepo();

  public generateAuthUrl(csrfToken: string): string {
    return this.authRepo.generateAuthUrlWithScopes(csrfToken);
  }

  public async authorizeCode(code: string): Promise<
    Result<{
      tokens: { accessToken: string; refreshToken: string };
      providerSub: string;
      email: string;
    }>
  > {
    try {
      return await this.authRepo.authenticate(code);
    } catch (e) {
      console.error('Failed to authorize code');
      console.error(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        error: 'Failed to authorize code',
      };
    }
  }

  public async authenticate(
    accessToken: string,
  ): Promise<Result<{ isVerified: boolean; providerSub: string }>> {
    try {
      return await this.authRepo.verifyAccessToken(accessToken);
    } catch (e) {
      console.debug(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        error: 'Failed to verify access token',
      };
    }
  }

  public async refresh(
    providerSub: string,
  ): Promise<Result<{ accessToken: string }>> {
    try {
      return { accessToken: await this.authRepo.refresh(providerSub) };
    } catch (e) {
      console.debug(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        error: 'Failed to refresh access token',
      };
    }
  }
}
