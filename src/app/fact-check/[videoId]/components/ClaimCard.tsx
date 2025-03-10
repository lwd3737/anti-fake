import { DetectedClaimPayload, VerifiedClaimPayload } from "@/dto/fact-check";
import { ChangeEvent } from "react";

interface Props {
	claim: DetectedClaimPayload;
	verifiedResult?: VerifiedClaimPayload;
	isBatchVerificationMode: boolean;
	isChecked: boolean;
	onCheckedChange: (ev: ChangeEvent, index: number) => void;
}

// TODO: checkbox를 바깥으로 빼기
export default function ClaimCard({
	claim,
	verifiedResult,
	isBatchVerificationMode,
	isChecked,
	onCheckedChange,
}: Props) {
	const claimId = `claim-${claim.index}`;
	const isVerified = !!verifiedResult;

	return (
		<div className="flex items-start gap-x-2 gap-y-1" key={claim.index}>
			<input
				className={`${
					isBatchVerificationMode && !isVerified ? "visible" : "invisible"
				} mt-[1px]`}
				id={claimId}
				type="checkbox"
				name={claimId}
				checked={isChecked}
				onChange={(ev) => onCheckedChange(ev, claim.index)}
			/>

			<article className="flex flex-col gap-y-4">
				<h3>주장 {claim.index + 1}</h3>
				<p>{claim.content}</p>
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
