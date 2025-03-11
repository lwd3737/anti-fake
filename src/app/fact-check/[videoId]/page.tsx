"use client";
import { ChangeEvent, MouseEvent } from "react";
import useClaimDetection from "./hooks/useClaimDetection";
import DetectionClaimResultCard, {
	VerificationStatus,
} from "./components/DetectionClaimResultCard";
import useClaimVerification from "./hooks/useClaimVerification";
import CheckBox from "@/app/components/form-controls/CheckBox";

export default function FactCheckPage({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	const { claimDetectionResults: detectedClaims, stopDetectingClaim } =
		useClaimDetection(videoId);
	const verification = useClaimVerification(detectedClaims);

	const handleSwitchToBatchVerificationModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		verification.switchToBatchMode();
	};

	const handleCancelBatchVerificationModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		verification.cancelBatchMode();
	};

	const handleAllSelectedForVerificationChange = (ev: ChangeEvent) => {
		const el = ev.target as HTMLInputElement;

		verification.updateClaimsToVerifiyBulk(
			detectedClaims.map((claim) => claim.index),
			el.checked,
		);
	};

	return (
		<main>
			<h1 className="text-2xl">팩트 체크 결과</h1>

			<section className="flex flex-col gap-y-10 py-5">
				{detectedClaims.map((claim) => {
					const verified = verification.verificationResults.find(
						(verified) => verified.claimIndex === claim.index,
					);
					const shouldVerify = verification.claimIndexesToVerifiy.has(
						claim.index,
					);
					const status = verified
						? VerificationStatus.VERIFIED
						: shouldVerify && verification.isBatchLoading
						? VerificationStatus.LOADING
						: VerificationStatus.NOT_VERIFIED;
					const isVerfiable =
						verification.isBatchMode &&
						status === VerificationStatus.NOT_VERIFIED;

					return (
						<div className="flex items-start gap-x-2 gap-y-1" key={claim.index}>
							<CheckBox
								className={`${isVerfiable ? "visible" : "invisible"} mt-[1px]`}
								checked={shouldVerify}
								onChange={(ev) =>
									verification.updateClaimToVerifiy(
										claim.index,
										ev.target.checked,
									)
								}
							/>
							<DetectionClaimResultCard
								key={claim.index}
								claimDetectionResult={claim}
								verificationResult={verified}
								status={status}
							/>
						</div>
					);
				})}

				<div className="right-0 bottom-0 left-0 fixed flex justify-end bg-white p-5">
					{verification.isBatchMode ? (
						verification.isBatchLoading ? (
							<button onClick={verification.stopBatch}>중단</button>
						) : (
							<div className="flex justify-between w-full">
								<div>
									<input
										id="all-selector"
										type="checkbox"
										checked={verification.isAllClaimsToVerifySelected}
										onChange={handleAllSelectedForVerificationChange}
									/>
									<label htmlFor="all-selector">전체 선택</label>
								</div>
								<div className="flex gap-x-3">
									<button onClick={verification.startBatch}>
										선택한 주장 검증하기
									</button>
									<button onClick={handleCancelBatchVerificationModeClick}>
										취소
									</button>
								</div>
							</div>
						)
					) : (
						<button onClick={handleSwitchToBatchVerificationModeClick}>
							미검증 주장 일괄 검증하기
						</button>
					)}
				</div>
			</section>
		</main>
	);
}
