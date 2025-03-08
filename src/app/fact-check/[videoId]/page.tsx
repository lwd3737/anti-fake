"use client";
import { MouseEvent } from "react";
import useClaimVerification from "./hooks/useClaimVerification";
import useClaimDetection from "./hooks/useClaimDetection";

export default function FactCheckPage({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	const { detectedClaims, stopDetectingClaim } = useClaimDetection(videoId);

	const {
		verifiedClaims,

		claimsChecked,
		handleClaimCheckedChange,
		handleAllClaimsCheckedChange,

		isBatchVerificationMode,
		isBatchVerificationLoading,
		switchToBatchMode,
		handleStartBatchVerficationSubmit,
		stopBatchVerification,
	} = useClaimVerification(detectedClaims);

	const handleSwitchToBatchModeClick = (ev: MouseEvent) => {
		ev.preventDefault();
		switchToBatchMode();
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
						const claimId = `claim-${claim.index}`;
						const verified = verifiedClaims.find(
							(verified) => verified.claimIndex === claim.index,
						);
						const isVerfied = verifiedClaims.some(
							(verified) => verified.claimIndex === claim.index,
						);
						const checked = claimsChecked[claim.index];

						return (
							<div className="flex flex-col gap-y-4" key={claim.index}>
								<h3>
									{isBatchVerificationMode && !isVerfied ? (
										<>
											<input
												id={claimId}
												type="checkbox"
												name={claimId}
												checked={checked}
												onChange={(ev) =>
													handleClaimCheckedChange(ev, claim.index)
												}
											/>
											<label htmlFor={claimId}>주장 {claim.index + 1}</label>
										</>
									) : (
										`주장 ${claim.index + 1}`
									)}
								</h3>
								<p>{claim.content}</p>
								<p>이유: {claim.reason}</p>

								<div className="h-[200px] overflow-y-auto">
									{verified && (
										<div className="flex flex-col gap-y-3">
											<p>사실 여부: {verified.verdictPrediction}</p>
											<p>근거: {verified.justificationProduction}</p>
											<p>출처: </p>
										</div>
									)}
								</div>
							</div>
						);
					})}

					<div className="right-0 bottom-0 left-0 fixed flex justify-end bg-white p-5">
						{isBatchVerificationMode ? (
							isBatchVerificationLoading ? (
								<button disabled>검증 중...</button>
							) : (
								<div className="flex justify-between w-full">
									<span>
										<input
											id="all-selector"
											type="checkbox"
											onChange={handleAllClaimsCheckedChange}
										/>
										<label htmlFor="all-selector">전체 선택</label>
									</span>
									<button type="submit">선택한 주장 검증하기</button>
								</div>
							)
						) : (
							<button type="button" onClick={handleSwitchToBatchModeClick}>
								미검증 주장 일괄 검증하기
							</button>
						)}
					</div>
				</form>
			</section>
		</main>
	);
}
