"use client";
import { ChangeEvent, MouseEvent } from "react";
import { useClaimDetection } from "../providers/ClaimDetectionProvider";
import { useClaimVerificationBatch } from "../providers/ClaimVerificationBatchProvider";
import { useClaimVerification } from "../providers/ClaimVerificationProvider";

export default function ControlHorizontalBar() {
	const { data: detectionResults, retry: retryDetection } = useClaimDetection();
	const { clear: clearVerficationResults } = useClaimVerification();
	const {
		start: startBatch,
		stop: stopBatch,
		isLoading: isBatchLoading,
		isBatchMode,
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
		retryDetection();
		clearVerficationResults();
	};

	return (
		<div className="right-0 bottom-0 left-0 fixed flex justify-end bg-white p-5">
			{isBatchMode ? (
				isBatchLoading ? (
					<button onClick={stopBatch}>중단</button>
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
							<button onClick={startBatch}>선택한 주장 검증하기</button>
							<button onClick={handleCancelBatchModeClick}>취소</button>
						</div>
					</div>
				)
			) : (
				<div className="flex gap-x-3">
					<button onClick={handleSwitchToBatchModeClick}>
						미검증 주장 일괄 검증하기
					</button>
					<button onClick={handleRetryDetectionClick}>
						주장 탐지 재시도하기
					</button>
				</div>
			)}
		</div>
	);
}
