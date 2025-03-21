import loadConfig from "@/config";
import { PageRoutes } from "@/constants/routes";
import GoogleAuth from "@/services/googgle-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;

	const state = searchParams.get("state");
	if (!state) {
		console.error("Failed to get oauth state", state);
		return redirect(PageRoutes.error.AUTH);
	}

	const csrfTokenCookie = cookies().get("csrf-token");
	if (!csrfTokenCookie) {
		console.error("Failed to get csrf token", csrfTokenCookie);
		return redirect(PageRoutes.error.AUTH);
	}

	if (state !== csrfTokenCookie.value) {
		console.error("State does not match csrf token");
		return redirect(PageRoutes.error.AUTH);
	}

	const authCode = searchParams.get("code");
	if (!authCode) {
		console.error("Failed to get auth code", authCode);
		return redirect(PageRoutes.error.AUTH);
	}

	const tokens = await GoogleAuth.create().getToken(authCode);
	if (!tokens.access_token) {
		console.error("Failed to get access token", tokens);
		return redirect(PageRoutes.error.AUTH);
	}

	cookies().set({
		name: "access-token",
		value: tokens.access_token,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
		secure: loadConfig().nodeEnv === "production",
		sameSite: "strict",
		httpOnly: true,
	});

	return redirect("/");
}
