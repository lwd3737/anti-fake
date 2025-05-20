export interface ClaimDetectionResult {
  index: number;
  content: string;
  reason: string;
}

export interface Claim {
  id: string;
  index: number;
  content: string;
  detectionReason: string;
}
