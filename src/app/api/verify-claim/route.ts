import { VerifyClaimRequestDto } from '@/gateway/dto/claim';
import { CreateClaimVerificationResponseDto } from '@/gateway/dto/fact-check';
import { streamResponse } from '@/gateway/streaming/stream-response';
import { isFailure } from '@/result';
import ClaimVerificationService from '@/services/claim-verification';
import EvidenceRetrievalService from '@/services/evidence-retrieval';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { claim } = (await req.json()) as VerifyClaimRequestDto;

  const evidenceRetriever = new EvidenceRetrievalService(req.signal);
  const claimVerifier = new ClaimVerificationService(req.signal);

  return streamResponse(async ({ send, close }) => {
    const retrievedResult = await evidenceRetriever.retrieve(
      claim.content,
      true,
    );

    if (isFailure(retrievedResult)) {
      console.error(retrievedResult.message);
    } else {
      const verifed = await claimVerifier.verify(
        {
          claim: claim.content,
          evidence: retrievedResult.map((item) => item.summary),
        },
        true,
      );
      const dto = {
        ...verifed,
        type: 'claimVerification',
        claimIndex: claim.index,
      } as CreateClaimVerificationResponseDto;

      send(dto);
    }

    close();
  });
}
