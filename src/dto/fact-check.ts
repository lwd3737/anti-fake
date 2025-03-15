import { ClaimDetectionResult } from "@/models/claim-detection";
import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";

// Request
export interface DetectClaimsRequestDto {
	videoId: string;
}

export interface VerifyClaimsRequestDto {
	claims: ClaimDto[];
}

export interface VerifyClaimRequestDto {
	claim: ClaimDto;
}

export interface ClaimDto {
	index: number;
	content: string;
}

// Response
export interface ClaimDetectionResponseDto extends ClaimDetectionResult {
	type: "claimDetectionResult";
}

export interface ClaimVerificationResponseDto
	extends ClaimVerificationResultWithDetails {
	type: "claimVerificationResult";
}

export type ClaimVerificationPayload = Omit<
	ClaimVerificationResponseDto,
	"type"
>;
