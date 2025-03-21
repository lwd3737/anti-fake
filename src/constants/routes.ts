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
	HOME: "/",
	LOGIN: "/login",
	OAUTH_CALLBACK: "/oauth-callback",
	error: {
		AUTH: "/error/auth",
	},
};
