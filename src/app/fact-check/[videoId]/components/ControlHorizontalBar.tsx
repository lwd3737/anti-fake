"use client";
import { ChangeEvent, useMemo } from "react";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import { useClaimVerification } from "../providers/ClaimVerificationProvider";
import Button from "@/components/Button";

interface Props {
	className?: string;
}

export default function ControlHorizontalBar({ className }: Props) {
	const { data: detectionResults, retry: retryDetection } = useClaimDetection();
	const { data: verificationResults, clear: clearVerficationResults } =
		useClaimVerification();
	const {
		isLoading: isBatchLoading,
		claimIndexesToVerify: claimIndexesToVerifiy,
		start: startBatch,
		stop: stopBatch,
		addClaimsToVerifyBulk,
		removeClaimsToVerifyBulk,
	} = useClaimVerificationBatch();

	const isAllVerified = verificationResults.length === detectionResults.length;

	const handleAllSelectionChange = (ev: ChangeEvent) => {
		if (isBatchLoading || isAllVerified) {
			ev.preventDefault();
			return;
		}

		const el = ev.target as HTMLInputElement;

		const claimIndexes = detectionResults.map((claim) => claim.index);
		if (el.checked) addClaimsToVerifyBulk(claimIndexes);
		else removeClaimsToVerifyBulk(claimIndexes);
	};

	const handleStartBatch = () => {
		startBatch();
		addClaimsToVerifyBulk(claimIndexesToVerifiy);
	};

	const handleRetryDetection = () => {
		const ok = confirm(
			"주장 탐지 재시도는 모든 항목들을 초기화합니다. 계속하시겠습니까?",
		);
		if (!ok) return;

		retryDetection();
		clearVerficationResults();
	};

	const allSelectionButtonStyle = useMemo(() => {
		const isDisabled = isBatchLoading || isAllVerified;
		const disabledStyle = isDisabled
			? "bg-[#1F3A9314] text-gray-400 cursor-not-allowed"
			: "hover:bg-[#1F3A934D]";
		return `text-[#1F3A93] bg-[#1F3A9320] ${disabledStyle}`;
	}, [isAllVerified, isBatchLoading]);

	const startBatchButtonStyle = useMemo(() => {
		const isDisabled = isBatchLoading || isAllVerified;
		const disabledStyle = isDisabled
			? "bg-[#AEB9D1] text-grapy-300 cursor-not-allowed"
			: "hover:bg-[#3A539B]";
		return `bg-[#1F3A93]  text-white  ${disabledStyle}`;
	}, [isAllVerified, isBatchLoading]);

	const retryButtonStyle = useMemo(
		() => `bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563]`,
		[],
	);

	return (
		<div
			// TODO: theme 적용
			className={`h-full flex items-center justify-end gap-x-6 bg-white p-5 shadow-sm [box-shadow:0_-1px_2px_0_rgba(0,0,0,0.05)] ${className}`}
		>
			<div className="flex justify-center items-center gap-x-4 pr-6 border-gray-200 border-r border-solid">
				<Button
					className={`flex items-center gap-x-2 ${allSelectionButtonStyle}`}
					disabled={isBatchLoading || isAllVerified}
				>
					<input
						id="all-selector"
						type="checkbox"
						disabled={isBatchLoading || isAllVerified}
						onChange={handleAllSelectionChange}
					/>
					<label htmlFor="all-selector">전체 선택</label>
				</Button>

				{isBatchLoading ? (
					<Button className="bg-[#E74C3C] text-white" onClick={stopBatch}>
						중단
					</Button>
				) : (
					<Button
						className={startBatchButtonStyle}
						disabled={isAllVerified}
						onClick={handleStartBatch}
					>
						<strong className="inline-block w-3 text-[#FFEB3B]">
							{claimIndexesToVerifiy.length}
						</strong>
						개 검증 시작
					</Button>
				)}
			</div>

			<Button className={retryButtonStyle} onClick={handleRetryDetection}>
				주장 탐지 재시도
			</Button>
		</div>
	);
}

const Styles = {
	BUTTON: "px-6 py-3 rounded-lg font-medium",
};
