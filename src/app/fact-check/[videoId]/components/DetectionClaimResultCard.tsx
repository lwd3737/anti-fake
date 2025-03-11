import {
	ClaimDetectionPayload,
	ClaimVerificationPayload,
} from "@/dto/fact-check";

interface Props {
	claimDetectionResult: ClaimDetectionPayload;
	verificationResult?: ClaimVerificationPayload;
	status: VerificationStatus;
}

export enum VerificationStatus {
	VERIFIED = "VERIFIED",
	LOADING = "LOADING",
	NOT_VERIFIED = "NOT_VERIFIED",
}

export default function DetectionClaimResultCard({
	claimDetectionResult,
	verificationResult,
	status,
}: Props) {
	return (
		<article className="flex flex-col gap-y-4">
			<div className="flex items-center gap-x-2">
				<span>{status}</span>
				<h3>
					{claimDetectionResult.index + 1}. {claimDetectionResult.content}
				</h3>
			</div>
			<p>이유: {claimDetectionResult.reason}</p>

			<div className="h-[200px] overflow-y-auto">
				{status === VerificationStatus.VERIFIED && (
					<div className="flex flex-col gap-y-3">
						<p>사실 여부: {verificationResult!.verdictPrediction}</p>
						<p>근거: {verificationResult!.justificationProduction}</p>
						<p>출처: </p>
					</div>
				)}
			</div>
		</article>
	);
}
