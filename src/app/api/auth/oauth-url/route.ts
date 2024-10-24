import loadConfig from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GenerateOauthUrlResponseDto } from "@/dto/auth";
import GoogleAuth from "@/services/google-auth";

export async function POST(
	req: NextRequest,
): Promise<NextResponse<GenerateOauthUrlResponseDto>> {
	const config = loadConfig();

	const googgleAuth = GoogleAuth.create();
	const oauthUrl = googgleAuth.generateAuthUrlWithYoutubeScope();

	cookies().set({
		name: "csrf-token",
		value: googgleAuth.csrfToken!,
		secure: config.nodeEnv === "production",
		sameSite: "strict",
		httpOnly: true,
	});

	return NextResponse.json({ oauthUrl });
}
