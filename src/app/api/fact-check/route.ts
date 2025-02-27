import loadConfig from "@/config";
import {
	DetectedClaimChunkDto,
	PerformFactCheckRequestDto,
	VerifiedClaimChunkDto,
} from "@/dto/fact-check";
import { ErrorCode } from "@/error/error-code";
import { handleRouteError } from "@/error/reponse-error-handler";
import { streamResponse } from "@/helpers/stream-response";
import FactCheckerService from "@/service/fact-checker/fact-checker";
import YoutubeService from "@/service/youtube";
import { json } from "@/utils/serialize";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { videoUrl } = (await req.json()) as PerformFactCheckRequestDto;
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

	return streamResponse(async ({ send, close }) => {
		await factChecker
			.onClaimDetected((claim) => {
				const dto = {
					...claim,
					type: "detectedClaim",
				} as DetectedClaimChunkDto;

				send(json(dto) + "\n");
			})
			.onClaimVerified((verified) => {
				const dto = {
					...verified,
					type: "verifiedClaim",
				} as VerifiedClaimChunkDto;

				send(json(dto) + "\n");
			})
			.onVerificationFinished(() => {
				close();
			})
			.start(subtitle);
	}, req.signal);
}
