import {
	ClaimDetectionPayload,
	ClaimVerificationPayload,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import { useCallback, useEffect, useState } from "react";

const useClaimVerificationBatch = ({
	claimDetectionResults,
	updateVerifiedClaims,
}: {
	claimDetectionResults: ClaimDetectionPayload[];
	updateVerifiedClaims: (
		verificationResults: ClaimVerificationPayload[],
	) => void;
}) => {
	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			updateVerifiedClaims(chunks as ClaimVerificationPayload[]);
		},
	);

	const [claimIndexesToVerifiy, setClaimIndexesToVerify] = useState<
		Set<number>
	>(new Set());
	const [isAllClaimsToVerifySelected, setIsAllClaimsToVerifySelected] =
		useState(false);

	useEffect(
		function initClaimsCheckedOnClaimsUpdated() {
			setClaimIndexesToVerify(
				new Set(claimDetectionResults.map((_, index) => index)),
			);
		},
		[claimDetectionResults],
	);

	const updateClaimToVerifiy = useCallback(
		(index: number, isSelected: boolean) => {
			setClaimIndexesToVerify((prev) =>
				isSelected
					? new Set([...Array.from(prev), index])
					: new Set([...Array.from(prev).filter((_index) => _index !== index)]),
			);
		},
		[],
	);

	const updateClaimsToVerifiyBulk = useCallback(
		(indexes: number[], isSelected: boolean) => {
			setClaimIndexesToVerify((prev) =>
				isSelected
					? new Set([...Array.from(prev), ...indexes])
					: new Set([
							...Array.from(prev).filter((_index) => !indexes.includes(_index)),
					  ]),
			);
		},
		[],
	);

	const [isBatchMode, setIsBatchMode] = useState(false);

	const switchToBatchMode = useCallback(() => {
		setIsBatchMode(true);
		setIsAllClaimsToVerifySelected(true);
		setClaimIndexesToVerify(
			new Set(claimDetectionResults.map((_, index) => index)),
		);
	}, [claimDetectionResults]);

	const cancelBatchMode = useCallback(() => {
		setIsBatchMode(false);
	}, []);

	const startBatch = useCallback(async () => {
		if (!isBatchMode) return;

		const hasClaimToVerify = claimIndexesToVerifiy.size > 0;
		if (!hasClaimToVerify) {
			alert("검증할 주장을 선택해주세요!");
			return;
		}

		const claimsToVerify = Array.from(claimIndexesToVerifiy.values()).map(
			(index) => claimDetectionResults[index],
		);

		const dto = {
			claims: claimsToVerify,
		} as VerifyClaimsRequestDto;
		await startStreaming("verify-claims", dto);

		setIsBatchMode(false);
	}, [
		claimIndexesToVerifiy,
		claimDetectionResults,
		isBatchMode,
		startStreaming,
	]);

	return {
		isAllClaimsToVerifySelected,
		claimIndexesToVerifiy,
		updateClaimToVerifiy,
		updateClaimsToVerifiyBulk,

		isBatchMode,
		isBatchLoading: isLoading,
		switchToBatchMode,
		cancelBatchMode,
		startBatch,
		stopBatch: stopStreaming,
	};
};

export default useClaimVerificationBatch;
