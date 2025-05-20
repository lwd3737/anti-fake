import assert from 'assert';
import { Evidence } from './evidence-retrieval';

export interface ClaimVerification {
  id: string;
  claimId: string;
  verdict: VerdictType;
  verdictReason: string;
  evidences: VerificationEvidence[];
}

export interface VerificationEvidence {
  summary: string;
  citaions: EvidenceCitation[];
}

export interface EvidenceCitation {
  siteName: string;
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface ClaimVerificationResult {
  verdict: VerdictType;
  reason: string;
}

export interface ClaimVerificationResultWithDetails
  extends ClaimVerificationResult {
  claimIndex: number;
  evidence: Evidence;
}

export enum VerdictType {
  TRUE = 'TRUE',
  MOSTLY_TRUE = 'MOSTLY_TRUE',
  MIXED = 'MIXED',
  MOSTLY_FALSE = 'MOSTLY_FALSE',
  FALSE = 'FALSE',
  UNKNOWN = 'UNKNOWN',
}

export const displayVerdict = (verdict: VerdictType): string => {
  switch (verdict) {
    case VerdictType.TRUE:
      return '진실';
    case VerdictType.MOSTLY_TRUE:
      return '대체로 진실';
    case VerdictType.MIXED:
      return '진실/거짓 혼합';
    case VerdictType.MOSTLY_FALSE:
      return '대체로 거짓';
    case VerdictType.FALSE:
      return '거짓';
    case VerdictType.UNKNOWN:
      return '알 수 없음';
    default:
      assert(false, `Unknown verdict: ${verdict}`);
  }
};
