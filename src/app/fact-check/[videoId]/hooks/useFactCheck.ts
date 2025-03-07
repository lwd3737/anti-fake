import {
	DetectedClaimPayload,
	FactCheckResponseDto,
	FactCheckResponseType,
	VerifiedClaimPayload,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import assert from "assert";
import {
	FormEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

const useFactCheck = (videoId: string) => {
	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimPayload[]>(
		[],
	);
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimPayload[]>(
		[],
	);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			const dtos = chunks as FactCheckResponseDto[];

			dtos.forEach((dto) => {
				switch (dto.type) {
					case FactCheckResponseType.DETECTED_CLAIM: {
						const { type, ...data } = dto;
						setDetectedClaims((claims) => [...claims, data]);
						break;
					}
					case FactCheckResponseType.VERIFIED_CLAIM: {
						const { type, ...data } = dto;
						setVerifiedClaims((claims) => [...claims, data]);
						break;
					}
					default:
						throw Error("Invalid chunk type");
				}
			});
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

	const [isBatchVerificationMode, setIsBatchVerificationMode] = useState(false);

	const handleSwitchToBatchVerificationModeClick = useCallback(
		(ev: MouseEvent) => {
			ev.preventDefault();
			setIsBatchVerificationMode(true);
		},
		[],
	);

	const handleStartVerificationSubmit = useCallback(
		async (ev: FormEvent<HTMLFormElement>) => {
			ev.preventDefault();

			if (!isBatchVerificationMode) return;

			const formData = new FormData(ev.currentTarget);

			const selectedIndexes = Array.from(formData.keys()).map((key) =>
				parseInt(key.split("-")[1]),
			);
			if (selectedIndexes.length === 0) {
				alert("검증할 주장을 선택해주세요!");
				return;
			}

			const selectedClaims = selectedIndexes.map((index) => {
				const claim = detectedClaims[index];
				assert(claim, "Claim not found");

				return { index, content: claim.content };
			});

			const dto = {
				claims: selectedClaims,
			} as VerifyClaimsRequestDto;
			await startStreaming("verify-claims", dto);

			setIsBatchVerificationMode(false);
		},
		[detectedClaims, isBatchVerificationMode, startStreaming],
	);

	return {
		detectedClaims,
		verifiedClaims,
		isLoading,
		handleStartVerificationSubmit,
		stop: stopStreaming,

		isBatchVerificationMode,
		handleSwitchToBatchVerificationModeClick,
	};
};

export default useFactCheck;
