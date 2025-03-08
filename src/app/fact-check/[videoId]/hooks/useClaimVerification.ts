import {
	DetectedClaimPayload,
	VerifiedClaimPayload,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import assert from "assert";
import { FormEvent, useCallback, useState } from "react";

const useClaimVerification = (claims: DetectedClaimPayload[]) => {
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimPayload[]>(
		[],
	);

	const {
		isLoading: isBatchLoading,
		startStreaming: startBatch,
		stopStreaming: stopBatch,
	} = useStreamingResponse((chunks: unknown[]) => {
		setVerifiedClaims((prev) => [
			...prev,
			...(chunks as VerifiedClaimPayload[]),
		]);
	});

	const [isBatchMode, setIsBatchMode] = useState(false);

	const switchToBatchMode = useCallback(() => {
		setIsBatchMode(true);
	}, []);

	const handleStartBatchSubmit = useCallback(
		async (ev: FormEvent<HTMLFormElement>) => {
			ev.preventDefault();

			if (!isBatchMode) return;

			const formData = new FormData(ev.currentTarget);

			const selectedIndexes = Array.from(formData.keys()).map((key) =>
				parseInt(key.split("-")[1]),
			);
			if (selectedIndexes.length === 0) {
				alert("검증할 주장을 선택해주세요!");
				return;
			}

			const selectedClaims = selectedIndexes.map((index) => {
				const claim = claims[index];
				assert(claim, "Claim not found");

				return { index, content: claim.content };
			});

			const dto = {
				claims: selectedClaims,
			} as VerifyClaimsRequestDto;
			await startBatch("verify-claims", dto);

			setIsBatchMode(false);
		},
		[claims, isBatchMode, startBatch],
	);

	return {
		verifiedClaims,
		isBatchVerificationMode: isBatchMode,
		isBatchVerificationLoading: isBatchLoading,
		switchToBatchMode: switchToBatchMode,
		handleStartBatchVerficationSubmit: handleStartBatchSubmit,
		stopBatchVerification: stopBatch,
	};
};

export default useClaimVerification;
