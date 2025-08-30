import loadConfig, { Config } from '@/config';
import { OauthProviderType, User } from '@/models/user';
import userRepo from '@/repositories/user';
import { google, Auth } from 'googleapis';

export default class AuthRepo {
  private config: Pick<Config['google'], 'clientId'>;
  private _client: Auth.OAuth2Client;

  constructor() {
    const {
      google: { clientId, clientSecret, redirectUrl },
    } = loadConfig();

    this.config = {
      clientId,
    };
    this._client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
  }

  public get client(): Auth.OAuth2Client {
    return this._client;
  }

  public setTokens(tokens: {
    accessToken?: string;
    refreshToken?: string;
  }): void {
    this._client.setCredentials({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });
  }

  public generateAuthUrlWithScopes(state?: string): string {
    return this.generateAuthUrl({
      state,
      scope: [
        'openid',
        'profile',
        'email',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtubepartner',
        // 'https://www.googleapis.com/auth/cse',
      ],
    });
  }

  public generateAuthUrl(options: Auth.GenerateAuthUrlOpts): string {
    return this._client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: true,
      ...options,
    });
  }

  public async authenticate(code: string): Promise<{
    tokens: { accessToken: string; refreshToken: string };
    providerSub: string;
    email: string;
  }> {
    const { tokens, res } = await this._client.getToken(code);
    if (res!.status >= 400 || !tokens.access_token || !tokens.refresh_token)
      throw new Error('Failed to generate tokens', { cause: res });

    this._client.setCredentials(tokens);

    const idToken = await this._client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: this.config.clientId,
    });

    const payload = idToken.getPayload();
    if (!payload) throw new Error('Failed to get payload');

    return {
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
      providerSub: payload.sub,
      email: payload.email!,
    };
  }

  public async verifyAccessToken(accessToken: string): Promise<boolean> {
    try {
      const { expiry_date } = await this._client.getTokenInfo(accessToken);
      const isExpired = expiry_date < Date.now();
      return !isExpired;
    } catch (e) {
      return false;
    }
  }

  public async getAccessToken(): Promise<string | null | undefined> {
    const { token } = await this._client.getAccessToken();
    return token;
  }

  public async refresh(providerSub: string): Promise<string> {
    const user = await userRepo.findByProviderSub({
      provider: OauthProviderType.GOOGLE,
      providerSub,
    });
    if (!user || !user.refreshToken)
      throw new Error('User or refresh token not found');

    this._client.setCredentials({
      refresh_token: user.refreshToken,
    });

    const { token } = await this._client.getAccessToken();
    if (!token) throw new Error('Access token not found');

    console.debug('refreshed');

    return token;
  }
}
