import { FactCheckYouttubeVideoRequestDto } from "@/dto/youttube";
import { ErrorCode } from "@/error/error-code";
import { handleRouteError } from "@/error/reponse-error-handler";
import FactCheckerService from "@/services/fact-checker/fact-checker";
import YoutubeService from "@/services/youtube";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { videoUrl } = (await req.json()) as FactCheckYouttubeVideoRequestDto;
	const url = new URL(videoUrl);

	if (url.host !== "www.youtube.com" || url.pathname !== "/watch") {
		return handleRouteError(
			ErrorCode.INVALID_YOUTUBE_VIDEO_URL,
			"Invalid Youtube video URL",
			400,
		);
	}

	const videoId = url.searchParams.get("v");
	if (!videoId) {
		return handleRouteError(
			ErrorCode.INVALID_YOUTUBE_VIDEO_URL,
			"Invalid Youtube video id",
			400,
		);
	}

	// TODO: 비디오에 대한 정보도 가져오기

	const subtitle = await YoutubeService.getSubtitle(videoId);
	const factChecker = new FactCheckerService();
	const result = await factChecker.execute(subtitle);

	return NextResponse.json({
		// subtitle: factChecker.getStageResult("correctedSubtitle"),
		claims: factChecker.getStageResult("detectedClaims"),
	});
}
