import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants/auth";
import { ErrorCode } from "@/error/error-code";
import { handleRouteError } from "@/error/reponse-error-handler";
import GoogleAuth from "@/service/google-auth";
import YoutubeService from "@/service/youtube";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { videoId: string } },
) {
	const { videoId } = params;

	// const cookieStore = cookies();
	// console.log("cookieStore", cookieStore);
	const cookieStore = req.cookies;
	const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
	console.log("accessToken", accessToken);
	if (!accessToken) {
		return handleRouteError(
			ErrorCode.UNAUTHORIZATION,
			"Access token not found",
			401,
		);
	}

	const googleAuth = GoogleAuth.create(accessToken.value);
	const youtube = YoutubeService.create(googleAuth);

	try {
		const video = await youtube.getVideo(videoId);

		return NextResponse.json(video);
	} catch (e) {
		const error = e as Error;

		return handleRouteError(
			ErrorCode.YOUTUBE_VIDEO_FETCH_FAILED,
			error.message,
			500,
		);
	}
}
