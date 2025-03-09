"use client";
import { ChangeEvent, MouseEvent } from "react";
import useClaimVerification from "./hooks/useClaimVerification";
import useClaimDetection from "./hooks/useClaimDetection";
import ClaimCard from "./components/ClaimCard";

export default function FactCheckPage({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	const { detectedClaims, stopDetectingClaim } = useClaimDetection(videoId);

	const {
		verifiedClaims,

		claimsChecked,
		allClaimsChecked,
		handleClaimCheckedChange,
		handleAllClaimsCheckedChange,

		isBatchVerificationMode,
		isBatchVerificationLoading,
		switchToBatchVerificationMode,
		cancelBatchVerificationMode,
		handleStartBatchVerficationSubmit,
		stopBatchVerification,
	} = useClaimVerification(detectedClaims);

	const handleSwitchToBatchVerificationModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		switchToBatchVerificationMode();
	};

	const handleCancelBatchVerificationModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		cancelBatchVerificationMode();
	};

	return (
		<main>
			<h1 className="text-2xl">팩트 체크 결과</h1>

			<section>
				<form
					className="flex flex-col gap-y-10 py-5"
					onSubmit={handleStartBatchVerficationSubmit}
				>
					{detectedClaims.map((claim) => {
						const verified = verifiedClaims.find(
							(verified) => verified.claimIndex === claim.index,
						);
						const isChecked = claimsChecked[claim.index];

						return (
							<ClaimCard
								key={claim.index}
								claim={claim}
								verifiedResult={verified}
								isBatchVerificationMode={isBatchVerificationMode}
								isChecked={isChecked}
								onCheckedChange={handleClaimCheckedChange}
							/>
						);
					})}

					<div className="right-0 bottom-0 left-0 fixed flex justify-end bg-white p-5">
						{isBatchVerificationMode ? (
							isBatchVerificationLoading ? (
								<button onClick={stopBatchVerification}>중단</button>
							) : (
								<div className="flex justify-between w-full">
									<div>
										<input
											id="all-selector"
											type="checkbox"
											checked={allClaimsChecked}
											onChange={handleAllClaimsCheckedChange}
										/>
										<label htmlFor="all-selector">전체 선택</label>
									</div>
									<div className="flex gap-x-3">
										<button type="submit">선택한 주장 검증하기</button>
										<button
											type="button"
											onClick={handleCancelBatchVerificationModeClick}
										>
											취소
										</button>
									</div>
								</div>
							)
						) : (
							<button
								type="button"
								onClick={handleSwitchToBatchVerificationModeClick}
							>
								미검증 주장 일괄 검증하기
							</button>
						)}
					</div>
				</form>
			</section>
		</main>
	);
}
