import { NextRequest, NextResponse } from "next/server";
import { APIRoutes, PageRoutes } from "./constants/routes";
import { fetchVerifyAccessToken } from "./app/api/auth/verify-token/fetch";
import { generateServerUrl } from "./utils/url";
import loadConfig from "./config";

export async function middleware(req: NextRequest) {
	const { devMode: new__devMode } = loadConfig();
	if (new__devMode.default) return NextResponse.next();

	if (isPublic(req.nextUrl.pathname)) return NextResponse.next();

	const isAuthenticated = await authenticate(req);
	if (!isAuthenticated)
		return NextResponse.redirect(generateServerUrl(PageRoutes.LOGIN));

	return NextResponse.next();
}

const isPublic = (pathname: string): boolean => {
	const staticPath = /^\/_next\/.*/;
	if (staticPath.test(pathname)) return true;

	const routes = [
		PageRoutes.error.AUTH,
		PageRoutes.LOGIN,
		PageRoutes.OAUTH_CALLBACK,
		APIRoutes.auth.OAUTH_URL,
		APIRoutes.auth.VERIFY_TOKEN,
		APIRoutes.auth.GENERATE_TOKEN,
	];
	return routes.includes(pathname);
};

const authenticate = async (req: NextRequest): Promise<boolean> => {
	try {
		const accessTokenCookie = req.cookies.get("access-token");
		if (!accessTokenCookie) {
			console.error("Access token not found");
			return false;
		}

		const { isVerified } = await fetchVerifyAccessToken(
			accessTokenCookie.value,
		);
		if (!isVerified) {
			console.error("Access token not verified");
			return false;
		}

		return true;
	} catch (e) {
		const error = e as Error;
		console.error("Failed to authenticate", error.message);
		return false;
	}
};
