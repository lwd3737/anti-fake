import { Claim } from '@/models/claim';

// Request
export interface CreateClaimsRequestDto {
  contentType: 'YOUTUBE_VIDEO';
  contentId: string;
}

export interface VerifyClaimRequestDto {
  claim: Claim;
}

// Response
export interface GetClaimsResponseDto {
  claims: Claim[];
}

export interface VerifyClaimsRequestDto {
  claims: Claim[];
  factCheckSessionId: string;
}

export interface DeleteClaimsRequestDto {
  factCheckSessionId: string;
}
