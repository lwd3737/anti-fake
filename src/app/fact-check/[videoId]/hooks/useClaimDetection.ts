import { ClaimDetectionPayload } from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import { useEffect, useRef, useState } from "react";

const useClaimDetection = (videoId: string) => {
	const [claimDetectionResults, setClaimDetectionResults] = useState<
		ClaimDetectionPayload[]
	>([]);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			setClaimDetectionResults((prev) => [
				...prev,
				...(chunks as ClaimDetectionPayload[]),
			]);
		},
	);

	const isMountedRef = useRef(false);

	useEffect(
		function detectClaimsOnMount() {
			if (isMountedRef.current) {
				return;
			}
			isMountedRef.current = true;
			startStreaming("detect-claims", { videoId });
		},
		[startStreaming, videoId],
	);

	return {
		claimDetectionResults,
		isDetectingClaim: isLoading,
		stopDetectingClaim: stopStreaming,
	};
};

export default useClaimDetection;
