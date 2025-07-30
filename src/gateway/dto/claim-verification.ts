import { ClaimVerification } from '@/models/claim-verification';
import { Failure } from '../error/reponse-error-handler';
import { ErrorCode } from '../error/error-code';

export interface GetClaimVerificationsResponseDto {
  claimVerifications: ClaimVerification[];
}

export type VerifyClaimResponseChunkDto =
  | ClaimVerification
  | VerifyClaimChunkErrorDto;

export type VerifyClaimChunkErrorDto = Failure<
  | ErrorCode.EVIDENCE_RETRIEVAL_FAILED
  | ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED,
  { claimId: string }
>;
