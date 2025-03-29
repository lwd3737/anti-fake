import { ClaimDetectionResult } from "@/models/claim-detection";
import VerficicationResultCardBody from "./VerificationResultCardBody";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import Image from "next/image";
import assert from "assert";

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
	const statusFileName = (() => {
		switch (status) {
			case VerificationStatus.VERIFIED:
				return "checked.svg";
			case VerificationStatus.NOT_VERIFIED:
				return "question-mark.svg";
			case VerificationStatus.LOADING:
				return "loading.svg";
			default:
				assert(false, `Unknown status: ${status}`);
		}
	})();

	return (
		<article className="flex flex-col flex-1 gap-y-4 bg-white shadow-sm p-6 rounded-sm">
			<div className="flex justify-between items-start gap-x-10">
				<div className="flex flex-1 items-start gap-x-2">
					<Image
						className={`mt-1 ${
							status === VerificationStatus.LOADING ? "animate-spin" : ""
						}`}
						src={`/icons/${statusFileName}`}
						alt={"status icon"}
						width={18}
						height={18}
					/>
					<p className="px-3 font-medium text-lg">
						{detectionResult.index + 1}. {'"'}
						{detectionResult.content}
						{'"'}
					</p>
				</div>
				<button onClick={onRemove}>
					<Image src="/icons/close.svg" alt="close" width={15} height={15} />
				</button>
			</div>

			{status === VerificationStatus.VERIFIED && (
				<VerficicationResultCardBody {...verificationResult!} />
			)}
		</article>
	);
}
