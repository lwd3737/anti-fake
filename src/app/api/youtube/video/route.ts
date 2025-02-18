import loadConfig from "@/config";
import { FactCheckYouttubeVideoRequestDto } from "@/dto/youttube";
import { ErrorCode } from "@/error/error-code";
import { handleRouteError } from "@/error/reponse-error-handler";
import FactCheckerService from "@/service/fact-checker/fact-checker";
import YoutubeService from "@/service/youtube";
import { NextRequest } from "next/server";

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

	const { devMode } = loadConfig();

	const subtitle = await YoutubeService.getSubtitle(videoId);
	const factChecker = new FactCheckerService(req.signal, { devMode });

	return new Response(
		new ReadableStream({
			async start(controller) {
				req.signal.addEventListener("abort", () => {
					factChecker.stop();
					controller.close();
				});

				await factChecker
					.onClaimDetected((claim) => {
						controller.enqueue(claim);
					})
					.onClaimVerified((verified) => {
						controller.enqueue(verified);
					})
					.onVerificationFinished(() => {
						controller.close();
					})
					.start(subtitle);
			},
		}),
	);

	// return NextResponse.json({
	// 	message: "success",
	// });
}
