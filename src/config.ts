import { youtube } from 'googleapis/build/src/apis/youtube';
import { use } from 'react';

export type Config = ReturnType<typeof loadConfig>;

export default function loadConfig() {
  const {
    BASE_URL,
    ADMIN_EMAIL,
    DATABASE_URL,
    AUTH_INACTIVE_MODE,
    JWT_SECRET,
    OPENAI_API_KEY,
    GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_KEY,
    GOOGLE_REDIRECT_URL,
    GOOGLE_CUSTOM_SEARCH_API_KEY,
    GOOGLE_SEARCH_ENGINE_ID,
    GEMINI_API_KEY,
    DEFAULT_DEV_MODE,
    MOCK_DATA_COUNT,
    YOUTUBE_SUBTITLE_DOWNLOAD_DEV_MODE,
    CLAIM_DETECTION_DEV_MODE,
    EVIDENCE_RETRIEVAL_DEV_MODE,
    CLAIM_VERIFICATION_DEV_MODE,
  } = process.env;

  if (!BASE_URL) throw new Error('BASE_URL is required');
  if (!ADMIN_EMAIL) throw new Error('ADMIN_EMAIL is required');
  if (!DATABASE_URL) throw new Error('DATABASE_URL is required');
  if (!JWT_SECRET) throw new Error('JWT_SECRET is required');
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required');
  if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY is required');
  if (!GOOGLE_CLIENT_ID) throw new Error('GOOGLE_CLIENT_ID is required');
  if (!GOOGLE_SECRET_KEY) throw new Error('GOOGLE_SECRET_KEY is required');
  if (!GOOGLE_REDIRECT_URL) throw new Error('GOOGLE_REDIRECT_URL is required');
  // if (!GOOGLE_CUSTOM_SEARCH_API_KEY)
  // 	throw new Error("GOOGLE_CUSTOM_SEARCH_API_KEY is required");
  // if (!GOOGLE_SEARCH_ENGINE_ID)
  // 	throw new Error("GOOGLE_SEARCH_ENGINE_ID is required");
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is required');

  return {
    nodeEnv: process.env.NODE_ENV,
    baseUrl: BASE_URL,
    databaseUrl: DATABASE_URL,
    admin: {
      email: ADMIN_EMAIL,
    },
    jwt: {
      secret: JWT_SECRET,
    },
    authInactiveMode: AUTH_INACTIVE_MODE === 'true',
    mockDataCount: MOCK_DATA_COUNT ? parseInt(MOCK_DATA_COUNT) : undefined,
    devMode: {
      default: DEFAULT_DEV_MODE === 'true',
      youtubeSubtitleDownload:
        YOUTUBE_SUBTITLE_DOWNLOAD_DEV_MODE === undefined
          ? undefined
          : YOUTUBE_SUBTITLE_DOWNLOAD_DEV_MODE === 'true',
      claimDetection:
        CLAIM_DETECTION_DEV_MODE === undefined
          ? undefined
          : CLAIM_DETECTION_DEV_MODE === 'true',
      evidenceRetrieval:
        EVIDENCE_RETRIEVAL_DEV_MODE === undefined
          ? undefined
          : EVIDENCE_RETRIEVAL_DEV_MODE === 'true',
      claimVerification:
        CLAIM_VERIFICATION_DEV_MODE === undefined
          ? undefined
          : CLAIM_VERIFICATION_DEV_MODE === 'true',
    },
    openai: {
      apiKey: OPENAI_API_KEY,
    },
    google: {
      apiKey: GOOGLE_API_KEY,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      redirectUrl: GOOGLE_REDIRECT_URL,
      customSearchApiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
      searchEngineId: GOOGLE_SEARCH_ENGINE_ID,
      gemini: {
        apiKey: GEMINI_API_KEY,
      },
    },
  };
}
