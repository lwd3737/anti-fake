import { ClaimVerification } from '@/models/claim-verification';
import prisma from './prisma';

const claimVerificationRepo = {
  async createMany(claimVerifications: ClaimVerification[]): Promise<void> {
    const result = await prisma.claimVerification.createMany({
      data: claimVerifications.map((verification) => ({
        ...verification,
        evidences: JSON.stringify(verification.evidences),
      })),
    });
    if (result.count !== claimVerifications.length) {
      console.error(
        'Failed to create partial claim verifications: ',
        claimVerifications.length - result.count,
      );
    }
  },
};

export default claimVerificationRepo;
