import {
	ClaimVerificationResponseDto,
	VerifyClaimRequestDto,
} from "@/dto/fact-check";
import { streamResponse } from "@/helpers/stream-response";
import ClaimVerifier from "@/service/claim-verifier";
import EvidenceRetriever from "@/service/evidence-retriever";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { claim } = (await req.json()) as VerifyClaimRequestDto;

	const evidenceRetriever = new EvidenceRetriever(req.signal);
	const claimVerifier = new ClaimVerifier(req.signal);

	return streamResponse(async ({ send, close }) => {
		const retrieved = await evidenceRetriever.retrieve(claim.content, true);

		if (EvidenceRetriever.isError(retrieved)) {
			console.error(retrieved.error);
		} else {
			const verifed = await claimVerifier.verify(
				{
					claim: claim.content,
					evidence: retrieved.contents,
				},
				true,
			);
			const dto = {
				...verifed,
				type: "claimVerificationResult",
				claimIndex: claim.index,
			} as ClaimVerificationResponseDto;

			send(dto);
		}

		close();
	});
}
