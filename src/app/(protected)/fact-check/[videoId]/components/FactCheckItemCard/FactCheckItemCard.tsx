import { ClaimDetectionResult } from "@/models/claim-detection";
import VerficicationResultCardBody from "./VerificationResultCardBody";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import Image from "next/image";
import assert from "assert";
import { useMemo } from "react";

interface Props {
	detectionResult: ClaimDetectionResult;
	verificationResult?: ClaimVerificationResultWithDetails;
	status: VerificationStatus;
	isSelected: boolean;
	onSelect: () => void;
	onUnselect: () => void;
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
	isSelected,
	onSelect,
	onUnselect,
	onRemove,
}: Props) {
	const statusFileName = useMemo(() => {
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
	}, [status]);

	const stateStyle = useMemo(() => {
		if (isSelected)
			return "outline outline-2 outline-[#1F3A93] bg-[#1F3A930D] cursor-pointer";
		else if (status === VerificationStatus.NOT_VERIFIED)
			return "hover:outline hover:outline-2 hover:bg-[#1F3A931A] hover:outline-[#1F3A93] cursor-pointer";
		else return "";
	}, [isSelected, status]);

	const handleClick = () => {
		if (status !== VerificationStatus.NOT_VERIFIED) return;

		if (isSelected) onUnselect();
		else onSelect();
	};

	return (
		<article
			className={`flex flex-col flex-1 gap-y-4 bg-white shadow-sm p-6 rounded-sm ${stateStyle}`}
			onClick={handleClick}
		>
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
