import {
	ClaimVerificationResponseDto,
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

			const evidence = await evidenceRetriever.retrieve(
				claim.content,
				isCompleted,
			);

			if (EvidenceRetriever.isError(evidence)) {
				console.error(evidence.error);
			} else {
				const evidenceContents = evidence.summaries.map(
					(summary) => summary.content,
				);

				const verifed = await claimVerifier.verify(
					{
						claim: claim.content,
						evidence: evidenceContents,
					},
					isCompleted,
				);
				const dto = {
					...verifed,
					type: "claimVerificationResult",
					claimIndex: claim.index,
					evidence,
				} satisfies ClaimVerificationResponseDto;

				send(dto);
			}
		}

		close();
	});
}
