import claimMapper from '@/mappers/claim';
import prisma from './prisma';
import { Claim } from '@/models/claim';

const claimRepo = {
  async findManyBySessionId(factCheckSessionId: string): Promise<Claim[]> {
    const claims = await prisma.claim.findMany({
      where: {
        factCheckSessionId,
      },
    });
    return claims.map(claimMapper.toDomain);
  },
};

export default claimRepo;
