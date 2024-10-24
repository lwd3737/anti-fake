export const API_ROUTES = {
	auth: {
		oauthUrl: "/api/auth/oauth-url",
		verifyToken: "/api/auth/verify-token",
		generateToken: "/api/auth/generate-token",
	},
};

export const PAGE_ROUTES = {
	login: "/login",
	oauthCallback: "/oauth-callback",
	error: {
		auth: "/error/auth",
	},
};
