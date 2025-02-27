"use client";
import {
	DetectedClaimChunkDto,
	FactCheckChunkDto,
	FactCheckChunkType,
	VerifiedClaimChunkDto,
} from "@/dto/fact-check";
import { json } from "@/utils/serialize";
import { useEffect, useRef, useState } from "react";

export default function FactCheck({
	searchParams,
}: {
	searchParams: { videoUrl: string };
}) {
	const { videoUrl } = searchParams;

	const aborterRef = useRef(new AbortController());

	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimChunkDto[]>(
		[],
	);
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimChunkDto[]>(
		[],
	);
	const isLoadingRef = useRef(false);

	useEffect(
		function performFactCheckOnMount() {
			const isLoading = isLoadingRef.current;
			if (isLoading) return;

			isLoadingRef.current = true;

			const aborter = aborterRef.current;

			fetch(`/api/fact-check`, {
				method: "POST",
				body: json({ videoUrl }),
				signal: aborter.signal,
			})
				.then(async (res) => {
					const stream = res.body;
					if (!stream) {
						alert("프로그램 오류입니다. 운영자에게 문의해주세요");
						return;
					}

					const reader = stream.getReader();
					const decoder = new TextDecoder();

					let incompletedChunk = "";

					while (true) {
						const { done, value } = await reader.read();
						if (done) {
							break;
						}

						const decoded = decoder.decode(value, { stream: true });
						const chunks = decoded.split("\n");
						incompletedChunk += chunks.pop();

						chunks.forEach((chunk, idx) => {
							const completedChunk =
								idx === 0 ? incompletedChunk + chunk : chunk;
							incompletedChunk = "";

							const parsed = JSON.parse(completedChunk) as FactCheckChunkDto;

							switch (parsed.type) {
								case FactCheckChunkType.DETECTED_CLAIM:
									setDetectedClaims((claims) => [...claims, parsed]);
									break;
								case FactCheckChunkType.VERIFIED_CLAIM:
									setVerifiedClaims((claims) => [...claims, parsed]);
									break;
								default:
									throw Error("Invalid chunk type");
							}
						});
					}
				})
				.catch((error) => {
					if (error.name === "AbortError") {
						return;
					}
				})
				.finally(() => (isLoadingRef.current = false));
		},
		[videoUrl],
	);

	return (
		<main>
			<h1 className="text-2xl">팩트 체크 결과</h1>

			<section className="py-5">
				{detectedClaims.map((claim) => {
					const verified = verifiedClaims.find(
						(verified) => verified.claimIndex === claim.index,
					);

					return (
						<div className="flex flex-col gap-y-4" key={claim.index}>
							<h3>주장 {claim.index + 1}</h3>
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
			</section>
		</main>
	);
}
