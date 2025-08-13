import { Claim } from '@/models/claim';
import { ErrorCode } from '../error/error-code';
import { Failure } from '../error/reponse-error-handler';
import { UIMessage } from 'ai';

// Request
export interface CreateClaimsRequestDto {
  contentType: 'YOUTUBE_VIDEO';
  contentId: string;
}

// export interface VerifyClaimRequestDto {
//   claim: Claim;
// }
export interface VerifyClaimsRequestDto {
  claims: Claim[];
  factCheckSessionId: string;
}

// Response
export interface GetClaimsResponseDto {
  claims: Claim[];
}

export type CreateClaimsErrorDto = Failure<
  | ErrorCode.UNAUTHORIZATION
  | ErrorCode.FACT_CHECK_SESSION_NOT_FOUND
  | ErrorCode.YOUTUBE_VIDEO_NOT_FOUND
  | ErrorCode.CLAIM_CREATE_FAILED
>;

export type ClaimResponseChunkDto = Claim;

export interface DeleteClaimsRequestDto {
  factCheckSessionId: string;
}

export type CreateClaimMessageDto = UIMessage<
  never,
  {
    'video-summary': {
      summary: string;
    };
    claim: {
      claim: Claim;
    };
    error: {
      code: ErrorCode.CLAIM_CREATE_FAILED;
      message: string;
    };
  }
>;
