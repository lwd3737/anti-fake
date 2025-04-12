import { log } from "console";

export const APIRoutes = {
	auth: {
		OAUTH_URL: "/api/auth/oauth-url",
		VERIFY_TOKEN: "/api/auth/verify-token",
		GENERATE_TOKEN: "/api/auth/generate-token",
		LOGOUT: "/api/auth/logout",
	},
	factCheck: {
		DETECT_CLAIMS: "/api/fact-check/detect-claims",
		VERIFY_CLAIMS: "/api/fact-check/verify-claims",
	},
};

export const PageRoutes = {
	LOGIN: "/login",
	HOME: "/",
	ARCHIVE: "/archive",
	OAUTH_CALLBACK: "/oauth-callback",
	error: {
		AUTH: "/error/auth",
	},
};
