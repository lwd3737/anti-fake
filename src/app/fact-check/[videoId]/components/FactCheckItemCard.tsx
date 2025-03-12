import {
	ClaimDetectionPayload,
	ClaimVerificationPayload,
} from "@/dto/fact-check";

interface Props {
	detectionResult: ClaimDetectionPayload;
	verificationResult?: ClaimVerificationPayload;
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
