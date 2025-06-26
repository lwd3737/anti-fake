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
    CLAIM_VERIFICATIONS: '/api/fact-check/claim-verifications',
  },
};

export const PageRoutes = {
  LOGIN: '/login',
  HOME: '/',
  factCheckSession: (contentId: string) => `/fact-check-session/${contentId}`,
  ARCHIVE: '/archive',
  OAUTH_CALLBACK: '/oauth-callback',
  error: {
    AUTH: '/error/auth',
  },
};
