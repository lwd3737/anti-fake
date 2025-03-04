import { DetectedClaim } from "@/service/claim-detector";
import { VerifiedClaim } from "@/service/claim-verifier";

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
export type FactCheckResponseDto =
	| DetectedClaimResponseDto
	| VerifiedClaimResponseDto;

export enum FactCheckResponseType {
	DETECTED_CLAIM = "detectedClaim",
	VERIFIED_CLAIM = "verifiedClaim",
}

export interface DetectedClaimResponseDto extends DetectedClaim {
	type: FactCheckResponseType.DETECTED_CLAIM;
}

export type DetectedClaimPayload = Omit<DetectedClaimResponseDto, "type">;

export interface VerifiedClaimResponseDto extends VerifiedClaim {
	type: FactCheckResponseType.VERIFIED_CLAIM;
	claimIndex: number;
}

export type VerifiedClaimPayload = Omit<VerifiedClaimResponseDto, "type">;
