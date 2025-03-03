"use client";
import {
	DetectedClaimPayload,
	FactCheckResponseDto,
	FactCheckResponseType,
	VerifiedClaimPayload,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import assert from "assert";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

export default function FactCheck({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimPayload[]>(
		[],
	);
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimPayload[]>(
		[],
	);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			const dtos = chunks as FactCheckResponseDto[];

			dtos.forEach((dto) => {
				switch (dto.type) {
					case FactCheckResponseType.DETECTED_CLAIM: {
						const { type, ...data } = dto;
						setDetectedClaims((claims) => [...claims, data]);
						break;
					}
					case FactCheckResponseType.VERIFIED_CLAIM: {
						const { type, ...data } = dto;
						setVerifiedClaims((claims) => [...claims, data]);
						break;
					}
					default:
						throw Error("Invalid chunk type");
				}
			});
		},
	);

	const isMountedRef = useRef(false);

	useEffect(
		function detectClaimsOnMount() {
			if (isMountedRef.current) {
				return;
			}
			isMountedRef.current = true;
			startStreaming("detect-claims", { videoId });
		},
		[startStreaming, videoId],
	);

	const handleSubmit = useCallback(
		async (ev: FormEvent<HTMLFormElement>) => {
			ev.preventDefault();

			const formData = new FormData(ev.currentTarget);

			const selectedIndexes = Array.from(formData.keys()).map((key) =>
				parseInt(key.split("-")[1]),
			);
			const selectedClaims = selectedIndexes.map((index) => {
				const content = detectedClaims[index];
				assert(content, "Claim not found");

				return { index, claim: detectedClaims[index].content };
			});

			await startStreaming("verify-claims", { claims: selectedClaims });
		},
		[detectedClaims, startStreaming],
	);

	return (
		<main>
			<h1 className="text-2xl">팩트 체크 결과</h1>

			<section>
				<form className="flex flex-col gap-y-10 py-5" onSubmit={handleSubmit}>
					{detectedClaims.map((claim) => {
						const claimId = `claim-${claim.index}`;
						const verified = verifiedClaims.find(
							(verified) => verified.claimIndex === claim.index,
						);

						return (
							<div className="flex flex-col gap-y-4" key={claim.index}>
								<h3>
									<input id={claimId} type="checkbox" name={claimId} />
									<label htmlFor={claimId}>주장 {claim.index + 1}</label>
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

					<button type="submit">선택한 주장 검증하기</button>
				</form>
			</section>
		</main>
	);
}
