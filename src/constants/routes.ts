import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";

export const API_ROUTES = {
	auth: {
		oauthUrl: "/api/auth/oauth-url",
	},
} as const;

export const PAGE_ROUTES = {
	error: {
		auth: "/error/auth",
	},
} as const;
