import { DetectedClaimPayload, VerifiedClaimPayload } from "@/dto/fact-check";
import { useCallback, useState } from "react";
import useClaimVerificationBatch from "./useClaimVerificationBatch";

const useClaimVerification = (claims: DetectedClaimPayload[]) => {
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimPayload[]>(
		[],
	);

	const updateVerifiedClaims = useCallback(
		(verifiedClaims: VerifiedClaimPayload[]) => {
			setVerifiedClaims((prev) => [...prev, ...verifiedClaims]);
		},
		[],
	);

	const batch = useClaimVerificationBatch({
		claims,
		verifiedClaims,
		updateVerifiedClaims,
	});

	return {
		verifiedClaims,
		...batch,
	};
};

export default useClaimVerification;
