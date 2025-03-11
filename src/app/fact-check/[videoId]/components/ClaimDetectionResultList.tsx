"use client";
import CheckBox from "@/app/components/form-controls/CheckBox";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import ClaimDetectionResultCard, {
	VerificationStatus,
} from "./ClaimDetectionResultCard";

export default function ClaimDetectionResultList() {
	const { data: detectionResults } = useClaimDetection();
	const {
		data: verificationResults,
		isLoading: isBatchLoading,
		isBatchMode,
		claimIndexesToVerifiy,
		updateClaimToVerifiy,
	} = useClaimVerificationBatch();

	return (
		<div className="contents">
			{detectionResults.map((detectionResult) => {
				const verified = verificationResults.find(
					(verified) => verified.claimIndex === detectionResult.index,
				);
				const shouldVerify = claimIndexesToVerifiy.has(detectionResult.index);
				const status = verified
					? VerificationStatus.VERIFIED
					: shouldVerify && isBatchLoading
					? VerificationStatus.LOADING
					: VerificationStatus.NOT_VERIFIED;
				const isVerfiable =
					isBatchMode && status === VerificationStatus.NOT_VERIFIED;

				return (
					<div
						className="flex items-start gap-x-2 gap-y-1"
						key={detectionResult.index}
					>
						<CheckBox
							className={`${isVerfiable ? "visible" : "invisible"} mt-[1px]`}
							checked={shouldVerify}
							onChange={(ev) =>
								updateClaimToVerifiy(detectionResult.index, ev.target.checked)
							}
						/>
						<ClaimDetectionResultCard
							key={detectionResult.index}
							detectionResult={detectionResult}
							verificationResult={verified}
							status={status}
						/>
					</div>
				);
			})}
		</div>
	);
}
