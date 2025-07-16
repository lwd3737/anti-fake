import { Claim } from '@/models/claim';
import { Result } from '@/result';

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

// TODO: 클라이언트에 적용
export type ClaimResponseChunkDto = Result<Claim>;

export interface DeleteClaimsRequestDto {
  factCheckSessionId: string;
}
