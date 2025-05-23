export interface User {
  id: string;
  provider: OauthProviderType;
  providerSub: string;
  email: string;
  role: UserRole;
  refreshToken: string | null;
}

export enum OauthProviderType {
  GOOGLE = 'GOOGLE',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
