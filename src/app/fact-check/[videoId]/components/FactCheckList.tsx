"use client";
import CheckBox from "@/app/components/inputs/CheckBox";
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
		isBatchMode,
		claimIndexesToVerifiy,
		updateClaimToVerifiy,
	} = useClaimVerificationBatch();

	const removeItem = (index: number) => {
		removeDetectionResult(index);
		removeVerficationResult(index);
	};

	return (
		<ol className="flex flex-col gap-y-10 h-full">
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
					<li
						className="flex items-start gap-x-3 gap-y-1"
						key={detectionResult.index}
					>
						<CheckBox
							className={` ${isVerfiable ? "visible" : "invisible"} mt-[1px]`}
							checked={shouldVerify}
							onChange={(ev) =>
								updateClaimToVerifiy(detectionResult.index, ev.target.checked)
							}
						/>
						<div className="flex-1">
							<FactCheckItemCard
								key={detectionResult.index}
								detectionResult={detectionResult}
								verificationResult={verified}
								status={status}
								onRemove={() => removeItem(detectionResult.index)}
							/>
						</div>
					</li>
				);
			})}
		</ol>
	);
}
