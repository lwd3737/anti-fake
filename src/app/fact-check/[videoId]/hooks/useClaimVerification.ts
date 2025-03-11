import {
	ClaimDetectionPayload,
	ClaimVerificationPayload,
} from "@/dto/fact-check";
import { useCallback, useState } from "react";
import useClaimVerificationBatch from "./useClaimVerificationBatch";

const useClaimVerification = (
	claimDetectionResults: ClaimDetectionPayload[],
) => {
	const [verificationResults, setVerificationResults] = useState<
		ClaimVerificationPayload[]
	>([]);

	const updateVerifiedClaims = useCallback(
		(verificationResults: ClaimVerificationPayload[]) => {
			setVerificationResults((prev) => [...prev, ...verificationResults]);
		},
		[],
	);

	const batch = useClaimVerificationBatch({
		claimDetectionResults,
		updateVerifiedClaims,
	});

	return {
		verificationResults,
		...batch,
	};
};

export default useClaimVerification;
