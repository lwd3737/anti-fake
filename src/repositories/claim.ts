import claimMapper from '@/mappers/claim';
import prisma from './prisma';
import { Claim } from '@/models/claim';

const claimRepo = {
  async createMany(factCheckSessionId: string, claims: Claim[]): Promise<void> {
    const result = await prisma.claim.createMany({
      data: claims.map(({ startAt, endAt, ...claim }) => ({
        factCheckSessionId,
        metadata: { startAt, endAt },
        ...claim,
      })),
    });
    if (result.count !== claims.length) {
      console.error(
        'Failed to create partial claims: ',
        claims.length - result.count,
      );
    }
  },

  async create(factCheckSessionId: string, claim: Claim): Promise<void> {
    const { startAt, endAt, ...data } = claim;
    await prisma.claim.create({
      data: {
        factCheckSessionId,
        metadata: { startAt, endAt },
        ...data,
      },
    });
  },

  async findManyBySessionId(factCheckSessionId: string): Promise<Claim[]> {
    const claims = await prisma.claim.findMany({
      where: {
        factCheckSessionId,
      },
    });
    return claims.map(claimMapper.fromPersistence);
  },

  async deleteManyBySessionId(factCheckSessionId: string): Promise<void> {
    await prisma.claim.deleteMany({
      where: {
        factCheckSessionId,
      },
    });
  },
};

export default claimRepo;
