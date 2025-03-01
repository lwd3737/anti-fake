import { VerifyClaimsRequestDto } from "@/dto/fact-check";
import { streamResponse } from "@/helpers/stream-response";
import EvidenceRetriever from "@/service/evidence-retriever";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { claims } = (await req.json()) as VerifyClaimsRequestDto;

	const evidenceRetriever = new EvidenceRetriever(req.signal);

	return streamResponse(({ send, close }) => {
		evidenceRetriever.onRetrieved((evidence) => {});
	});
}
