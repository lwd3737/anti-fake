import { ClaimDetectionResult } from "@/service/claim-detector";
import { ClaimVerificationResult } from "@/service/claim-verifier";
import { RetrivedEvidence } from "@/service/evidence-retriever";

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

export type ClaimDetectionPayload = Omit<ClaimDetectionResponseDto, "type">;

export interface ClaimVerificationResponseDto extends ClaimVerificationResult {
	type: "claimVerificationResult";
	claimIndex: number;
	evidence: RetrivedEvidence;
}

export type ClaimVerificationPayload = Omit<
	ClaimVerificationResponseDto,
	"type"
>;
