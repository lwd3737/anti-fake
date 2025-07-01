import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { CreateClaimVerificationResponseDto } from '@/gateway/dto/fact-check';
import { streamResponse } from '@/gateway/streaming/stream-response';
import { isFailure } from '@/result';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetrievalService from '@/services/evidence-retrieval';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { factCheckSessionId, claims } =
    (await req.json()) as VerifyClaimsRequestDto;

  const evidenceRetrieval = new EvidenceRetrievalService(req.signal);
  const claimVerification = new ClaimVerificationService(req.signal);

  return streamResponse(async ({ send, close }) => {
    evidenceRetrieval
      .onRetrieved(async (retrievalResult) => {
        if (isFailure(retrievalResult)) {
          const error = retrievalResult;
          send(error);
          console.debug(error);
          return;
        }

        const { claim, evidences, isCompleted } = retrievalResult;
        const verification = await claimVerification.verify(
          {
            factCheckSessionId,
            claim,
            evidences,
          },
          isCompleted,
        );

        const dto = {
          ...verification,
          claimId: claim.id,
        } satisfies CreateClaimVerificationResponseDto;
        send(dto);

        if (isCompleted) {
          close();
        }
      })
      .retrieveBulk(claims);
  });
}
