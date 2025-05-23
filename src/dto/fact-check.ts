import { Claim } from '@/models/claim';
import { ClaimVerificationResultWithDetails } from '@/models/claim-verification';

// Request

// Response
export interface CreateClaimsResponseDto extends Claim {}

export interface ClaimVerificationResponseDto
  extends ClaimVerificationResultWithDetails {
  type: 'claimVerificationResult';
}
