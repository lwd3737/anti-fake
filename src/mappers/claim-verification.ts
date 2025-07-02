import {
  ClaimVerification,
  VerdictType,
  VerificationEvidence,
} from '@/models/claim-verification';
import { ClaimVerification as PrismaClaimVerification } from '/prisma/generated/prisma';

const claimVerificationMapper = {
  toDomain(record: PrismaClaimVerification): ClaimVerification {
    return {
      id: record.id,
      factCheckSessionId: record.factCheckSessionId,
      claimId: record.claimId,
      verdict: record.verdict as VerdictType,
      verdictReason: record.verdictReason,
      evidences: record.evidences as unknown as VerificationEvidence[],
    };
  },
};

export default claimVerificationMapper;
