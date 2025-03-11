import { DetectedClaimPayload, VerifiedClaimPayload } from "@/dto/fact-check";

interface Props {
	claim: DetectedClaimPayload;
	verifiedResult?: VerifiedClaimPayload;
	status: VerificationStatus;
}

export enum VerificationStatus {
	VERIFIED = "VERIFIED",
	LOADING = "LOADING",
	NOT_VERIFIED = "NOT_VERIFIED",
}

export default function ClaimCard({ claim, verifiedResult, status }: Props) {
	return (
		<article className="flex flex-col gap-y-4">
			<div className="flex items-center gap-x-2">
				<span>{status}</span>
				<h3>
					{claim.index + 1}. {claim.content}
				</h3>
			</div>
			<p>이유: {claim.reason}</p>

			<div className="h-[200px] overflow-y-auto">
				{status === VerificationStatus.VERIFIED && (
					<div className="flex flex-col gap-y-3">
						<p>사실 여부: {verifiedResult!.verdictPrediction}</p>
						<p>근거: {verifiedResult!.justificationProduction}</p>
						<p>출처: </p>
					</div>
				)}
			</div>
		</article>
	);
}
