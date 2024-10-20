import { FactCheckYouttubeVideoRequestDto } from "@/dto/youttube";
import { ErrorCode } from "@/error/code";
import { handleError } from "@/error/reponse-handler";
import YoutubeService from "@/services/youtube";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { videoUrl } = (await req.json()) as FactCheckYouttubeVideoRequestDto;
	const url = new URL(videoUrl);

	if (url.host !== "www.youtube.com" || url.pathname !== "/watch") {
		return handleError(ErrorCode.INVALID_URL, "Invalid URL", 400);
	}

	const videoId = url.searchParams.get("v");
	if (!videoId) {
		return handleError(ErrorCode.INVALID_URL, "Invalid URL", 400);
	}

	const youtube = YoutubeService.create();

	const video = await youtube.getVideo(videoId);
	console.log("video", video);

	const caption = await youtube.downloadCaption(video.id);
	console.log(caption);

	return NextResponse.json({ video, caption });
}
