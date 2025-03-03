import {
	DetectedClaimResponseDto,
	DetectClaimsRequestDto,
} from "@/dto/fact-check";
import { streamResponse } from "@/helpers/stream-response";
import ClaimDetector from "@/service/claim-detector";
import YoutubeService from "@/service/youtube";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { videoId } = (await req.json()) as DetectClaimsRequestDto;

	const subtitle = await YoutubeService.downloadSubtitle(videoId);
	const claimDetector = new ClaimDetector(req.signal);

	return streamResponse(({ send, close }) => {
		claimDetector
			.onClaimDetected((claim) => {
				const dto = {
					...claim,
					type: "detectedClaim",
				} as DetectedClaimResponseDto;

				send(dto);
			})
			.onFinished(() => {
				close();
			})
			.onError((error) => {
				close();
			})
			.start(subtitle);
	}, req.signal);
}
