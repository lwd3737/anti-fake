import loadConfig from '@/config';
import { ErrorCode } from '@/gateway/error/error-code';
import AuthRepo from '@/repositories/auth';
import { Result } from '@/result';
import { Auth } from 'googleapis';
import jwt from 'jsonwebtoken';

export default class AuthService {
  private authRepo = new AuthRepo();

  public get client(): Auth.OAuth2Client {
    return this.authRepo.client;
  }

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
      const { tokens, ...info } = await this.authRepo.authenticate(code);
      return {
        tokens: {
          accessToken: this.generateJWT(tokens.accessToken, info.providerSub),
          refreshToken: tokens.refreshToken,
        },
        ...info,
      };
    } catch (e) {
      console.error('Failed to authorize code');
      console.error(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        message: 'Failed to authorize code',
      };
    }
  }

  public async authenticate(
    jwt: string,
  ): Promise<Result<{ isVerified: boolean; providerSub: string }>> {
    try {
      const { accessToken, sub } = this.verifyJWT(jwt);
      const isVerified = await this.authRepo.verifyAccessToken(accessToken);
      return {
        isVerified,
        providerSub: sub,
      };
    } catch (e) {
      console.debug(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        message: 'Failed to verify access token',
      };
    }
  }

  public async refresh(providerSub: string): Promise<Result<string>> {
    try {
      const accessToken = await this.authRepo.refresh(providerSub);
      return this.generateJWT(accessToken, providerSub);
    } catch (e) {
      console.debug(e);
      return {
        code: ErrorCode.UNAUTHENTICATED,
        message: 'Failed to refresh access token',
      };
    }
  }

  private generateJWT(accessToken: string, providerSub: string): string {
    return jwt.sign(
      {
        accessToken,
        sub: providerSub,
      },
      loadConfig().jwt.secret,
    );
  }

  private verifyJWT(token: string): {
    accessToken: string;
    sub: string;
  } {
    return jwt.verify(token, loadConfig().jwt.secret) as {
      accessToken: string;
      sub: string;
    };
  }
}
