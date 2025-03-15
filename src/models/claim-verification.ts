import assert from "assert";
import { Evidence } from "./evidence-retrieval";

export interface ClaimVerificationResult {
	verdict: VerificationVerdict;
	reason: string;
}

export interface ClaimVerificationResultWithDetails
	extends ClaimVerificationResult {
	claimIndex: number;
	evidence: Evidence;
}

export enum VerificationVerdict {
	TRUE = "TRUE",
	MOSTLY_TRUE = "MOSTLY_TRUE",
	MIXED = "MIXED",
	MOSTLY_FALSE = "MOSTLY_FALSE",
	FALSE = "FALSE",
	UNKNOWN = "UNKNOWN",
}

export const displayVerdict = (verdict: VerificationVerdict): string => {
	switch (verdict) {
		case VerificationVerdict.TRUE:
			return "사실";
		case VerificationVerdict.MOSTLY_TRUE:
			return "대체로 사실";
		case VerificationVerdict.MIXED:
			return "사실과 거짓이 섞여 있음";
		case VerificationVerdict.MOSTLY_FALSE:
			return "대체로 거짓";
		case VerificationVerdict.FALSE:
			return "거짓";
		case VerificationVerdict.UNKNOWN:
			return "알 수 없음";
		default:
			assert(false, `Unknown verdict: ${verdict}`);
	}
};
