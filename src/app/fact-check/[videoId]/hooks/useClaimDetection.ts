import { DetectedClaimPayload } from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import { useEffect, useRef, useState } from "react";

const useClaimDetection = (videoId: string) => {
	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimPayload[]>(
		[],
	);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			setDetectedClaims((prev) => [
				...prev,
				...(chunks as DetectedClaimPayload[]),
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
		detectedClaims,
		isDetectingClaim: isLoading,
		stopDetectingClaim: stopStreaming,
	};
};

export default useClaimDetection;
