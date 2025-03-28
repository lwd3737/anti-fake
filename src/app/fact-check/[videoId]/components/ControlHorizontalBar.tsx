"use client";
import { ChangeEvent, MouseEvent } from "react";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import { useClaimVerification } from "../providers/ClaimVerificationProvider";

interface Props {
	className?: string;
}

export default function ControlHorizontalBar({ className }: Props) {
	const { data: detectionResults, retry: retryDetection } = useClaimDetection();
	const { clear: clearVerficationResults } = useClaimVerification();
	const {
		isLoading: isBatchLoading,
		isBatchMode,
		claimIndexesToVerifiy,
		start: startBatch,
		stop: stopBatch,
		switchToBatchMode,
		cancelBatchMode,
		updateClaimsToVerifiyBulk,
	} = useClaimVerificationBatch();

	const handleSwitchToBatchModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		switchToBatchMode();
		updateClaimsToVerifiyBulk(
			detectionResults.map((claim) => claim.index),
			true,
		);
	};

	const handleCancelBatchModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		cancelBatchMode();
	};

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
			className={`h-full flex items-center justify-end bg-white p-5 ${className} shadow-sm [box-shadow:0_-1px_2px_0_rgba(0,0,0,0.05)]`}
		>
			{isBatchMode ? (
				isBatchLoading ? (
					<button
						className={`${Styles.BUTTON} bg-[#E74C3C] text-white`}
						onClick={stopBatch}
					>
						중단
					</button>
				) : (
					<div className="flex justify-between w-full">
						<div>
							<input
								id="all-selector"
								type="checkbox"
								defaultChecked={true}
								onChange={handleAllSelectionChange}
							/>
							<label htmlFor="all-selector">전체 선택</label>
						</div>
						<div className="flex gap-x-3">
							<button
								className={`${Styles.BUTTON} bg-[#27AE60] text-white`}
								onClick={startBatch}
							>
								<strong className="text-[#FFEB3B]">
									{claimIndexesToVerifiy.size}
								</strong>
								개 주장 검증하기
							</button>
							<button
								className={`${Styles.BUTTON} bg-[#95A5A6] text-white`}
								onClick={handleCancelBatchModeClick}
							>
								취소
							</button>
						</div>
					</div>
				)
			) : (
				<div className="flex gap-x-4">
					<button
						className={`${Styles.BUTTON} bg-[#1F3A93] text-white`}
						onClick={handleSwitchToBatchModeClick}
					>
						검증할 주장 선택하기
					</button>
					<button
						className={`${Styles.BUTTON} bg-[#F3F4F6] text-[#4B5563]`}
						onClick={handleRetryDetectionClick}
					>
						주장 탐지 재시도하기
					</button>
				</div>
			)}
		</div>
	);
}

const Styles = {
	BUTTON: "px-6 py-3 rounded-lg font-medium",
};
