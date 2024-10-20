import { NextRequest, NextResponse } from "next/server";
import loadConfig from "./config";

export function middleware(req: NextRequest) {
	const { baseUrl } = loadConfig();

	// if (isAuthRequired(req.nextUrl.pathname)) {
	// 	const accessToken = req.cookies.get("access-token");
	// 	if (!accessToken) {
	// 		return NextResponse.redirect(`${baseUrl}/login`);
	// 	}
	// }

	return NextResponse.next();
}

const isAuthRequired = (path: string) => {
	return path !== "/login";
};
