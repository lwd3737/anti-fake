import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { ClaimVerificationResponseDto } from '@/gateway/dto/fact-check';
import { streamResponse } from '@/gateway/streaming/stream-response';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetriever from '@/services/evidence-retriever';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { claims } = (await req.json()) as VerifyClaimsRequestDto;

  const evidenceRetriever = new EvidenceRetriever(req.signal);
  const claimVerifier = new ClaimVerificationService(req.signal);

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
        const evidenceSummaries = evidence.items.map((item) => item.summary);

        const verificationResult = await claimVerifier.verify(
          {
            claim: claim.content,
            evidence: evidenceSummaries,
          },
          isCompleted,
        );
        const dto = {
          ...verificationResult,
          type: 'claimVerificationResult',
          claimIndex: claim.index,
          evidence,
        } satisfies ClaimVerificationResponseDto;

        send(dto);
      }
    }

    close();
  });
}
