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

const useClaimVerificationBatch = ({
	claims,
	verifiedClaims,
	updateVerifiedClaims,
}: {
	claims: DetectedClaimPayload[];
	verifiedClaims: VerifiedClaimPayload[];
	updateVerifiedClaims: (verifiedClaims: VerifiedClaimPayload[]) => void;
}) => {
	const isClaimVerified = useCallback(
		(index: number): boolean => {
			return verifiedClaims.some((verified) => verified.claimIndex === index);
		},
		[verifiedClaims],
	);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			updateVerifiedClaims(chunks as VerifiedClaimPayload[]);
		},
	);

	const [claimsChecked, setClaimsChecked] = useState<boolean[]>([]);
	const [allClaimsChecked, setAllClaimsChecked] = useState(false);

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

	const handleAllClaimsCheckedChange = useCallback(
		(ev: ChangeEvent) => {
			const el = ev.target as HTMLInputElement;

			setAllClaimsChecked(el.checked);

			if (el.checked) {
				setClaimsChecked((prev) =>
					prev.map((_, index) => (isClaimVerified(index) ? false : true)),
				);
			} else {
				setClaimsChecked((prev) => prev.map(() => false));
			}
		},
		[isClaimVerified],
	);

	const [isBatchMode, setIsBatchMode] = useState(false);

	const switchToBatchMode = useCallback(() => {
		setIsBatchMode(true);
		setAllClaimsChecked(true);
		setClaimsChecked((prev) =>
			prev.map((_, index) => (isClaimVerified(index) ? false : true)),
		);
	}, [isClaimVerified]);

	const cancelBatchMode = useCallback(() => {
		setIsBatchMode(false);
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
			await startStreaming("verify-claims", dto);

			setIsBatchMode(false);
		},
		[claims, claimsChecked, isBatchMode, startStreaming],
	);

	return {
		claimsChecked,
		allClaimsChecked,
		handleClaimCheckedChange,
		handleAllClaimsCheckedChange,

		isBatchMode,
		isBatchLoading: isLoading,
		switchToBatchMode,
		cancelBatchMode,
		handleStartBatchSubmit,
		stopBatch: stopStreaming,
	};
};

export default useClaimVerificationBatch;
