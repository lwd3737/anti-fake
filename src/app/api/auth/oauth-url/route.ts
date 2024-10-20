import loadConfig from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import GoogleAuth from "@/services/googgle-auth";
import { GenerateOauthUrlDto } from "@/dto/auth";

export async function POST(
	req: NextRequest,
): Promise<NextResponse<GenerateOauthUrlDto>> {
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

	// return NextResponse.redirect(authUrl, {
	// 	status: 302,
	// 	headers: {
	// 		"Access-Control-Allow-Origin": "*",
	// 		"Access-Control-Allow-Methods": "GET",
	// 	},
	// });

	return NextResponse.json({ oauthUrl });
}
