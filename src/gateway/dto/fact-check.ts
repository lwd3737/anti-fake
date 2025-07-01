import { Claim } from '@/models/claim';
import { ClaimVerification } from '@/models/claim-verification';

// Request

// Response
export interface CreateClaimsResponseDto extends Claim {}

export interface CreateClaimVerificationResponseDto extends ClaimVerification {}
