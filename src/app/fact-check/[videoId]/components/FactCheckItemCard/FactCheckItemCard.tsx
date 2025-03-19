import { ClaimDetectionResult } from "@/models/claim-detection";
import VerficicationResultCardBody from "./VerificationResultCardBody";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";

interface Props {
	detectionResult: ClaimDetectionResult;
	verificationResult?: ClaimVerificationResultWithDetails;
	status: VerificationStatus;
	onRemove: () => void;
}

export enum VerificationStatus {
	VERIFIED = "VERIFIED",
	LOADING = "LOADING",
	NOT_VERIFIED = "NOT_VERIFIED",
}

export default function FactCheckItemCard({
	detectionResult,
	verificationResult,
	status,
	onRemove,
}: Props) {
	return (
		<article className="flex flex-col flex-1 gap-y-4">
			<div className="flex justify-between items-center gap-x-10">
				<div className="flex items-center gap-x-2">
					<span>{status}</span>
					<h3>
						{detectionResult.index + 1}. {detectionResult.content}
					</h3>
				</div>
				<button onClick={onRemove}>삭제</button>
			</div>

			{status === VerificationStatus.VERIFIED && (
				<VerficicationResultCardBody {...verificationResult!} />
			)}
		</article>
	);
}
