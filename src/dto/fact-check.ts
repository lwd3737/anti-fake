import { DetectedClaim } from "@/service/claim-detector";
import { VerifiedClaimWithIndex } from "@/service/fact-checker/fact-checker";

export interface PerformFactCheckRequestDto {
	videoUrl: string;
}

export type FactCheckChunkDto = DetectedClaimChunkDto | VerifiedClaimChunkDto;

export enum FactCheckChunkType {
	DETECTED_CLAIM = "detectedClaim",
	VERIFIED_CLAIM = "verifiedClaim",
}

export interface DetectedClaimChunkDto extends DetectedClaim {
	type: FactCheckChunkType.DETECTED_CLAIM;
}

export interface VerifiedClaimChunkDto extends VerifiedClaimWithIndex {
	type: FactCheckChunkType.VERIFIED_CLAIM;
}
