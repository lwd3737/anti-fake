export const APIRoutes = {
  auth: {
    OAUTH_URL: '/api/auth/oauth-url',
    OAUTH_CALLBACK: '/api/auth/oauth-callback',
    GENERATE_TOKENS: '/api/auth/generate-tokens',
    SET_ACCESS_TOKEN_COOKIE: '/api/auth/set-access-token-cookie',
    LOGOUT: '/api/auth/logout',
  },
  factCheckSessions: {
    CLAIMS: (factCheckSessionId: string) =>
      `/api/fact-check-sessions/${factCheckSessionId}/claims`,
    VERIFY_CLAIMS: '/api/fact-check/verify-claims',
  },
};

export const PageRoutes = {
  LOGIN: '/login',
  HOME: '/',
  ARCHIVE: '/archive',
  OAUTH_CALLBACK: '/oauth-callback',
  error: {
    AUTH: '/error/auth',
  },
};
