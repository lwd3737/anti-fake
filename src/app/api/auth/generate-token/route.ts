import loadConfig from "@/config";
import { GenerateTokenRequestDto } from "@/dto/auth";
import { ErrorCode } from "@/error/code";
import { handleRouteError } from "@/error/reponse-handler";
import GoogleAuth from "@/services/google-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { state, authCode } = (await req.json()) as GenerateTokenRequestDto;

	if (!state) {
		return handleRouteError(
			ErrorCode.CSRF_TOKEN_MISMATCH,
			"Failed to get oauth state",
			401,
		);
	}

	const csrfTokenCookie = cookies().get("csrf-token");
	if (!csrfTokenCookie) {
		return handleRouteError(
			ErrorCode.CSRF_TOKEN_MISMATCH,
			"Failed to get oauth state",
			401,
		);
	}

	if (state !== csrfTokenCookie.value) {
		return handleRouteError(
			ErrorCode.CSRF_TOKEN_MISMATCH,
			"State does not match csrf token",
			401,
		);
	}

	if (!authCode) {
		return handleRouteError(
			ErrorCode.AUTH_CODE_NOT_INCLUDED,
			"Failed to get auth code",
			401,
		);
	}

	const tokens = await GoogleAuth.create().getToken(authCode);
	if (!tokens.access_token) {
		return handleRouteError(
			ErrorCode.ACCESS_TOKEN_GENERATION_FAILED,
			"Failed to generate access token",
			403,
		);
	}

	cookies().set({
		name: "access-token",
		value: tokens.access_token,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
		secure: loadConfig().nodeEnv === "production",
		sameSite: "strict",
		httpOnly: true,
	});

	return NextResponse.json({ isAuthenticated: true });
}
