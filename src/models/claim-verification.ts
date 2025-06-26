export interface ClaimVerification {
  id: string;
  claimId: string;
  verdict: VerdictType;
  verdictReason: string;
  evidences: VerificationEvidence[];
}

export interface VerificationEvidence {
  summary: string;
  citations: EvidenceCitation[];
}

export interface EvidenceCitation {
  siteName: string;
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export enum VerdictType {
  TRUE = 'TRUE',
  MOSTLY_TRUE = 'MOSTLY_TRUE',
  MIXED = 'MIXED',
  MOSTLY_FALSE = 'MOSTLY_FALSE',
  FALSE = 'FALSE',
  UNKNOWN = 'UNKNOWN',
}

// deprecated
export interface ClaimVerificationResult {
  verdict: VerdictType;
  reason: string;
}
