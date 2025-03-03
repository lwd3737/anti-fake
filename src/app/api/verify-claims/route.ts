import { VerifyClaimsRequestDto } from "@/dto/fact-check";
import { streamResponse } from "@/helpers/stream-response";
import ClaimVerifier from "@/service/claim-verifier";
import EvidenceRetriever from "@/service/evidence-retriever";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { claims } = (await req.json()) as VerifyClaimsRequestDto;

	const evidenceRetriever = new EvidenceRetriever(req.signal);
	const claimVerifier = new ClaimVerifier(req.signal);

	return streamResponse(({ send, close }) => {
		evidenceRetriever
			.onRetrieved(async (result) => {
				if (EvidenceRetriever.isError(result)) {
					send(result);
					return;
				}

				const verifed = await claimVerifier.verify({
					claim: claims[result.claimIndex].content,
					evidence: result.content,
				});

				send(verifed);
			})
			.start(claims);
	});
}
