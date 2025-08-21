import { ClaimVerification } from '@/models/claim-verification';
import { Failure } from '../error/reponse-error-handler';
import { ErrorCode } from '../error/error-code';
import { UIMessage } from 'ai';

export interface GetClaimVerificationsResponseDto {
  claimVerifications: ClaimVerification[];
}

export type VerifyClaimMessageDto = UIMessage<
  never,
  {
    'claim-verification': {
      claimVerification: ClaimVerification;
    };
    error: {
      code:
        | ErrorCode.EVIDENCE_RETRIEVAL_FAILED
        | ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED;
      message: string;
      claimId: string;
    };
  }
>;
