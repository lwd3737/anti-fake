"use client";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
		resetClaimsToVerify,
	} = useClaimVerificationBatch();

	const [isAllItemsSelected, setIsAllItemsSelected] = useState(true);

	useEffect(
		function toggleAllSelectionOnCheckboxUpdate() {
			const claimIndexes = detectionResults.map((claim) => claim.index);
			if (isAllItemsSelected) {
				const verifiedClaimIndexes = verificationResults.map(
					(result) => result.claimIndex,
				);
				const notVerifiedClaimsIndexes = claimIndexes.filter(
					(index) => !verifiedClaimIndexes.includes(index),
				);
				addClaimsToVerifyBulk(notVerifiedClaimsIndexes);
			} else {
				resetClaimsToVerify();
			}
		},
		[
			addClaimsToVerifyBulk,
			detectionResults,
			isAllItemsSelected,
			resetClaimsToVerify,
			verificationResults,
		],
	);

	const handleAllSelectionChange = (ev: ChangeEvent) => {
		const isChecked = (ev.target as HTMLInputElement).checked;
		setIsAllItemsSelected(isChecked);
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

		resetClaimsToVerify();
		clearVerficationResults();
		retryDetection();
	};

	const isAllVerified = verificationResults.length === detectionResults.length;

	const allSelectionButtonStyle = useMemo(() => {
		const isDisabled = isBatchLoading || isAllVerified;
		return isDisabled
			? "bg-[#02020213] text-gray-400 cursor-not-allowed"
			: "text-brand bg-[#1F3A9320] hover:bg-brand-hover";
	}, [isAllVerified, isBatchLoading]);

	const startBatchButtonStyle = useMemo(() => {
		const isDisabled = isBatchLoading || isAllVerified;
		return isDisabled
			? "bg-[#AEB9D1] text-gray-300 cursor-not-allowed"
			: "bg-brand text-white hover:bg-brand-hover";
	}, [isAllVerified, isBatchLoading]);

	const retryButtonStyle = useMemo(
		() => `bg-surface-subtle hover:bg-surface-subtle-hover text-text-base`,
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
						checked={isAllItemsSelected}
						onChange={handleAllSelectionChange}
					/>
					<label htmlFor="all-selector">전체 선택</label>
				</Button>

				{isBatchLoading ? (
					<Button className="bg-danger text-white" onClick={stopBatch}>
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
