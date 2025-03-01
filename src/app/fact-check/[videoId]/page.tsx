"use client";
import {
	DetectedClaimChunkDto,
	FactCheckChunkDto,
	FactCheckChunkType,
	VerifiedClaimChunkDto,
} from "@/dto/fact-check";
import useStreamingResponse from "@/hooks/useStreamingResponse";
import { json } from "@/utils/serialize";
import { useEffect, useRef, useState } from "react";

export default function FactCheck({
	params: { videoId },
}: {
	params: { videoId: string };
}) {
	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimChunkDto[]>(
		[],
	);
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimChunkDto[]>(
		[],
	);

	const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
		(chunks: unknown[]) => {
			const dtos = chunks as FactCheckChunkDto[];

			dtos.forEach((dto) => {
				switch (dto.type) {
					case FactCheckChunkType.DETECTED_CLAIM:
						setDetectedClaims((claims) => [...claims, dto]);
						break;
					case FactCheckChunkType.VERIFIED_CLAIM:
						setVerifiedClaims((claims) => [...claims, dto]);
						break;
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

	return (
		<main>
			<h1 className="text-2xl">팩트 체크 결과</h1>

			<section className="flex flex-col gap-y-10 py-5">
				{detectedClaims.map((claim) => {
					const verified = verifiedClaims.find(
						(verified) => verified.claimIndex === claim.index,
					);

					return (
						<div className="flex flex-col gap-y-4" key={claim.index}>
							<h3>주장 {claim.index + 1}</h3>
							<p>{claim.content}</p>
							<p>이유: {claim.reason}</p>

							{/* <div className="h-[200px] overflow-y-auto">
								{verified && (
									<div className="flex flex-col gap-y-3">
										<p>사실 여부: {verified.verdictPrediction}</p>
										<p>근거: {verified.justificationProduction}</p>
										<p>출처: </p>
									</div>
								)}
							</div> */}
						</div>
					);
				})}
			</section>
		</main>
	);
}
