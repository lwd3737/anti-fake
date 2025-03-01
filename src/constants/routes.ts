import { log } from "console";

export const API_ROUTES = {
	auth: {
		oauthUrl: "/api/auth/oauth-url",
		verifyToken: "/api/auth/verify-token",
		generateToken: "/api/auth/generate-token",
		logout: "/api/auth/logout",
	},
	factCheck: {
		detectClaims: "/api/fact-check/detect-claims",
		verifyClaims: "/api/fact-check/verify-claims",
	},
};

export const PAGE_ROUTES = {
	login: "/login",
	oauthCallback: "/oauth-callback",
	error: {
		auth: "/error/auth",
	},
};
