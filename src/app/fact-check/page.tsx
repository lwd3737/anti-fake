"use client";
import {
	DetectedClaimChunkDto,
	FactCheckChunkDto,
	FactCheckChunkType,
	VerifiedClaimChunkDto,
} from "@/dto/fact-check";
import { json } from "@/utils/serialize";
import { useEffect, useState } from "react";

export default function FactCheck({
	searchParams,
}: {
	searchParams: { videoUrl: string };
}) {
	const { videoUrl } = searchParams;

	const [detectedClaims, setDetectedClaims] = useState<DetectedClaimChunkDto[]>(
		[],
	);
	const [verifiedClaims, setVerifiedClaims] = useState<VerifiedClaimChunkDto[]>(
		[],
	);

	useEffect(
		function performFactCheckOnMount() {
			fetch(`/api/fact-check`, {
				method: "POST",
				body: json({ videoUrl }),
			}).then(async (res) => {
				const stream = res.body;
				if (!stream) {
					alert("프로그램 오류입니다. 운영자에게 문의해주세요");
					return;
				}

				const reader = stream.getReader();
				const decoder = new TextDecoder();

				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}

					const chunk = JSON.parse(
						decoder.decode(value, { stream: true }),
					) as FactCheckChunkDto;

					switch (chunk.type) {
						case FactCheckChunkType.DETECTED_CLAIM:
							setDetectedClaims((claims) => [...claims, chunk]);
							break;
						case FactCheckChunkType.VERIFIED_CLAIM:
							setVerifiedClaims((claims) => [...claims, chunk]);
							break;
						default:
							throw Error("Invalid chunk type");
					}
				}
			});
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
						<div key={claim.index}>
							<h3>주장 {claim.index + 1}</h3>
							<p>{claim.content}</p>
							<p>이유: {claim.reason}</p>

							<div className="h-[200px] overflow-y-auto">
								{verified && (
									<div>
										<p>사실 여부: {verified.justificationProduction}</p>
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
