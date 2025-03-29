"use client";
import { ChangeEvent, MouseEvent } from "react";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import { useClaimVerification } from "../providers/ClaimVerificationProvider";
import Button from "@/components/Button";

interface Props {
	className?: string;
}

export default function ControlHorizontalBar({ className }: Props) {
	const { data: detectionResults, retry: retryDetection } = useClaimDetection();
	const { clear: clearVerficationResults } = useClaimVerification();
	const {
		isLoading: isBatchLoading,
		claimIndexesToVerifiy,
		start: startBatch,
		stop: stopBatch,
		updateClaimsToVerifiyBulk,
	} = useClaimVerificationBatch();

	const handleAllSelectionChange = (ev: ChangeEvent) => {
		const el = ev.target as HTMLInputElement;

		updateClaimsToVerifiyBulk(
			detectionResults.map((claim) => claim.index),
			el.checked,
		);
	};

	const handleRetryDetectionClick = () => {
		const ok = confirm(
			"주장 탐지 재시도는 모든 항목들을 초기화합니다. 계속하시겠습니까?",
		);
		if (!ok) return;

		retryDetection();
		clearVerficationResults();
	};

	return (
		<div
			// TODO: theme 적용
			className={`h-full flex items-center justify-end gap-x-6 bg-white p-5 shadow-sm [box-shadow:0_-1px_2px_0_rgba(0,0,0,0.05)] ${className}`}
		>
			<div className="flex justify-center items-center gap-x-4 pr-6 border-gray-200 border-r border-solid">
				<Button className="flex items-center gap-x-2 bg-[#1F3A9320]">
					<input
						id="all-selector"
						type="checkbox"
						onChange={handleAllSelectionChange}
					/>
					<label className="#1F3A93" htmlFor="all-selector">
						전체 선택
					</label>
				</Button>

				{isBatchLoading ? (
					<Button className="bg-[#E74C3C] text-white" onClick={stopBatch}>
						중단
					</Button>
				) : (
					<Button className="bg-[#1F3A93] text-white" onClick={startBatch}>
						<strong className="text-[#FFEB3B]">
							{claimIndexesToVerifiy.size}
						</strong>
						개 검증 시작
					</Button>
				)}
			</div>

			<Button
				className="bg-[#F3F4F6] text-[#4B5563]"
				onClick={handleRetryDetectionClick}
			>
				주장 탐지 재시도
			</Button>
		</div>
	);
}

const Styles = {
	BUTTON: "px-6 py-3 rounded-lg font-medium",
};
