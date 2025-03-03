import {
	FactCheckResponseType,
	VerifiedClaimResponseDto,
	VerifyClaimsRequestDto,
} from "@/dto/fact-check";
import { streamResponse } from "@/helpers/stream-response";
import ClaimVerifier from "@/service/claim-verifier";
import EvidenceRetriever from "@/service/evidence-retriever";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { claims } = (await req.json()) as VerifyClaimsRequestDto;

	const evidenceRetriever = new EvidenceRetriever(req.signal);
	const claimVerifier = new ClaimVerifier(req.signal);

	return streamResponse(async ({ send, close }) => {
		for (let idx = 0; idx < claims.length; idx++) {
			const isCompleted = idx === claims.length - 1;
			const claim = claims[idx];

			const retrieved = await evidenceRetriever.retrieve(
				claim.content,
				isCompleted,
			);

			if (EvidenceRetriever.isError(retrieved)) {
				console.error(retrieved.error);
			} else {
				const verifed = await claimVerifier.verify({
					claim: claim.content,
					evidence: retrieved.content,
				});
				const dto = {
					...verifed,
					type: FactCheckResponseType.VERIFIED_CLAIM,
					claimIndex: claim.index,
				} as VerifiedClaimResponseDto;

				send(dto);
			}
		}

		close();
	});
}
