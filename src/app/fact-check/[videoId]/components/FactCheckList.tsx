"use client";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import FactCheckItemCard, {
	VerificationStatus,
} from "./FactCheckItemCard/FactCheckItemCard";
import { useClaimVerification } from "../providers/ClaimVerificationProvider";

export default function FactCheckList() {
	const { data: detectionResults, remove: removeDetectionResult } =
		useClaimDetection();
	const { data: verificationResults, remove: removeVerficationResult } =
		useClaimVerification();
	const {
		isLoading: isBatchLoading,
		claimIndexesToVerify,
		addClaimToVerify,
		removeClaimToVerify,
	} = useClaimVerificationBatch();

	const removeItem = (index: number) => {
		removeDetectionResult(index);
		removeVerficationResult(index);
	};

	return (
		<ol className="flex flex-col gap-y-10 px-12 py-8 h-full overflow-y-auto">
			{detectionResults.map((detectionResult) => {
				const verificationResult = verificationResults.find(
					(verified) => verified.claimIndex === detectionResult.index,
				);
				const isSelected = claimIndexesToVerify.includes(detectionResult.index);
				const status = verificationResult
					? VerificationStatus.VERIFIED
					: isSelected && isBatchLoading
					? VerificationStatus.LOADING
					: VerificationStatus.NOT_VERIFIED;

				// TODO: theme 적용
				return (
					<li className="flex flex-col gap-y-6" key={detectionResult.index}>
						<FactCheckItemCard
							key={detectionResult.index}
							detectionResult={detectionResult}
							verificationResult={verificationResult}
							status={status}
							isSelected={isSelected}
							onSelect={() =>
								!isBatchLoading && addClaimToVerify(detectionResult.index)
							}
							onUnselect={() =>
								!isBatchLoading && removeClaimToVerify(detectionResult.index)
							}
							onRemove={() => removeItem(detectionResult.index)}
						/>
					</li>
				);
			})}
		</ol>
	);
}
