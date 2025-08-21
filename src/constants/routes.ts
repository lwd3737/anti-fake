export const APIRoutes = {
  auth: {
    OAUTH_URL: '/api/auth/oauth-url',
    OAUTH_CALLBACK: '/api/auth/oauth-callback',
    GENERATE_TOKENS: '/api/auth/generate-tokens',
    SET_ACCESS_TOKEN_COOKIE: '/api/auth/set-access-token-cookie',
    LOGOUT: '/api/auth/logout',
  },
  factCheckSessions: {
    claims: (factCheckSessionId: string) =>
      `/api/fact-check-sessions/${factCheckSessionId}/claims`,
    claim: (factCheckSessionId: string, claimId: string) =>
      `/api/fact-check-sessions/${factCheckSessionId}/claims/${claimId}`,
    CLAIM_VERIFICATIONS: (factCheckSessionId: string) =>
      `/api/fact-check-sessions/${factCheckSessionId}/claim-verifications`,
  },
  youtube: {
    TRANSCRIPT: `/api/youtube/transcript`,
  },
};

export const PageRoutes = {
  LOGIN: '/login',
  HOME: '/',
  factCheckSession: (factCheckSessionId: string) =>
    `/fact-check-sessions/${factCheckSessionId}`,
  ARCHIVE: '/archive',
  OAUTH_CALLBACK: '/oauth-callback',
  error: {
    AUTH: '/error/auth',
  },
};
