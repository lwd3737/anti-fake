import {
	DetectedClaimPayload,
	VerifiedClaimPayload,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from "react";

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

	const cancelBatchMode = useCallback(() => {
		setIsBatchMode(false);
	}, []);

	const [claimsChecked, setClaimsChecked] = useState<boolean[]>([]);

	useEffect(
		function initClaimsCheckedOnClaimsUpdated() {
			setClaimsChecked(claims.map(() => false));
		},
		[claims],
	);

	const handleClaimCheckedChange = useCallback(
		(ev: ChangeEvent, index: number) => {
			const el = ev.target as HTMLInputElement;

			setClaimsChecked((prev) =>
				prev.map((checked, _index) =>
					_index === index ? el.checked : checked,
				),
			);
		},
		[],
	);

	const handleAllClaimsCheckedChange = useCallback((ev: ChangeEvent) => {
		const el = ev.target as HTMLInputElement;

		if (el.checked) {
			setClaimsChecked((prev) => prev.map(() => true));
		} else {
			setClaimsChecked((prev) => prev.map(() => false));
		}
	}, []);

	const handleStartBatchSubmit = useCallback(
		async (ev: FormEvent<HTMLFormElement>) => {
			ev.preventDefault();

			if (!isBatchMode) return;

			const hasCheckedClaim = claimsChecked.some((checked) => checked);
			if (!hasCheckedClaim) {
				alert("검증할 주장을 선택해주세요!");
				return;
			}

			const checkedClaims = claimsChecked
				.map((checked, idx) => checked && claims[idx])
				.filter(Boolean) as DetectedClaimPayload[];

			const dto = {
				claims: checkedClaims,
			} as VerifyClaimsRequestDto;
			await startBatch("verify-claims", dto);

			setIsBatchMode(false);
		},
		[claims, claimsChecked, isBatchMode, startBatch],
	);

	return {
		verifiedClaims,

		claimsChecked,
		handleClaimCheckedChange,
		handleAllClaimsCheckedChange,

		isBatchVerificationMode: isBatchMode,
		isBatchVerificationLoading: isBatchLoading,
		switchToBatchVerificationMode: switchToBatchMode,
		cancelBatchVerificationMode: cancelBatchMode,
		handleStartBatchVerficationSubmit: handleStartBatchSubmit,
		stopBatchVerification: stopBatch,
	};
};

export default useClaimVerification;
