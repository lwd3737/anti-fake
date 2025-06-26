import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { CreateClaimVerificationResponseDto } from '@/gateway/dto/fact-check';
import { streamResponse } from '@/gateway/streaming/stream-response';
import { isFailure } from '@/result';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetrievalService from '@/services/evidence-retrieval';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { claims } = (await req.json()) as VerifyClaimsRequestDto;

  const evidenceRetrieval = new EvidenceRetrievalService(req.signal);
  const claimVerification = new ClaimVerificationService(req.signal);

  return streamResponse(async ({ send, close }) => {
    await evidenceRetrieval
      .retrieveBulk(claims)
      .onRetrieved((retrievalResult) => {
        if (isFailure(retrievalResult)) {
          send(retrievalResult);
          console.debug(retrievalResult);
          return;
        }

        const evidences = retrievalResult;
      });
    // TODO: 이벤트 기반으로 처리하는 방식으로 변경
    // for (let idx = 0; idx < claims.length; idx++) {
    //   const isCompleted = idx === claims.length - 1;
    //   const claim = claims[idx];

    //   const retrievalResult = await evidenceRetrieval.retrieve(
    //     claim.content,
    //   );

    //   if (isFailure(retrievalResult)) {
    //     console.error(retrievalResult.error);
    //   } else {
    //     const evidenceSummaries = retrievalResult.map((item) => item.summary);
    //     const verificationResult = await claimVerification.verify(
    //       {
    //         claim: claim.content,
    //         evidence: evidenceSummaries,
    //       },
    //       isCompleted,
    //     );
    //     const dto = {
    //       ...verificationResult,
    //       type: 'claimVerification',
    //       claimId: claim.id,
    //       evidences: retrievalResult,
    //     } satisfies CreateClaimVerificationResponseDto;

    //     send(dto);
    //   }
    // }

    close();
  });
}
