import {
  ClaimVerification,
  VerdictType,
  VerificationEvidence,
} from '@/models/claim-verification';
import { ClaimVerification as PrismaClaimVerification } from '@/generated/prisma/client';

const claimVerificationMapper = {
  toDomain(record: PrismaClaimVerification): ClaimVerification {
    return {
      id: record.id,
      factCheckSessionId: record.factCheckSessionId,
      claimId: record.claimId,
      verdict: record.verdict as VerdictType,
      verdictReason: record.verdictReason,
      evidences: JSON.parse(
        record.evidences as string,
      ) as VerificationEvidence[],
    };
  },
};

export default claimVerificationMapper;
