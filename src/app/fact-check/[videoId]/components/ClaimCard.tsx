import { DetectedClaimPayload, VerifiedClaimPayload } from "@/dto/fact-check";
import { ChangeEvent } from "react";

interface Props {
	claim: DetectedClaimPayload;
	verifiedResult?: VerifiedClaimPayload;
	isVerificationBatchMode: boolean;
	isVerificationBatchLoading: boolean;
	isVerificattionSelected: boolean;
	onVerficationSelectionChange: (ev: ChangeEvent, index: number) => void;
}

export default function ClaimCard({
	claim,
	verifiedResult,
	isVerificationBatchMode,
	isVerificationBatchLoading,
	isVerificattionSelected,
	onVerficationSelectionChange,
}: Props) {
	const claimId = `claim-${claim.index}`;
	const isVerified = !!verifiedResult;

	const status = isVerified
		? "verified"
		: isVerificattionSelected && isVerificationBatchLoading
		? "loading"
		: "notVerified";

	return (
		<div className="flex items-start gap-x-2 gap-y-1" key={claim.index}>
			<input
				className={`${
					isVerificationBatchMode && !isVerified ? "visible" : "invisible"
				} mt-[1px]`}
				id={claimId}
				type="checkbox"
				name={claimId}
				checked={isVerificattionSelected}
				onChange={(ev) => onVerficationSelectionChange(ev, claim.index)}
			/>

			<article className="flex flex-col gap-y-4">
				<div className="flex items-center gap-x-2">
					<span>{status}</span>
					<h3>
						{claim.index + 1}. {claim.content}
					</h3>
				</div>
				<p>이유: {claim.reason}</p>

				<div className="h-[200px] overflow-y-auto">
					{isVerified && (
						<div className="flex flex-col gap-y-3">
							<p>사실 여부: {verifiedResult.verdictPrediction}</p>
							<p>근거: {verifiedResult.justificationProduction}</p>
							<p>출처: </p>
						</div>
					)}
				</div>
			</article>
		</div>
	);
}
