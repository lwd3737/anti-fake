import { ClaimVerification } from '@/models/claim-verification';
import prisma from './prisma';
import claimVerificationMapper from '@/mappers/claim-verification';

const claimVerificationRepo = {
  async findByFactCheckSessionId(
    factCheckSessionId: string,
  ): Promise<ClaimVerification[]> {
    const result = await prisma.claimVerification.findMany({
      where: {
        factCheckSessionId,
      },
    });
    return result.map(claimVerificationMapper.toDomain);
  },

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
