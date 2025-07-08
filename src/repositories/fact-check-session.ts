import { FactCheckSession } from '@/models/fact-check-session';
import prisma from './prisma';
import factCheckSessionMapper from '@/mappers/fact-check-session';

const factCheckSessionRepo = {
  async create(
    input: Pick<FactCheckSession, 'userId' | 'contentType' | 'contentId'>,
  ): Promise<FactCheckSession> {
    const created = await prisma.factCheckSession.create({
      data: input,
    });
    return factCheckSessionMapper.toDomain(created);
  },

  async findById(id: string): Promise<FactCheckSession | null> {
    const found = await prisma.factCheckSession.findUnique({
      where: { id },
    });
    return found ? factCheckSessionMapper.toDomain(found) : null;
  },

  async findByUserAndContent(
    input: { userId: string } & Pick<
      FactCheckSession,
      'contentType' | 'contentId'
    >,
  ) {
    const found = await prisma.factCheckSession.findUnique({
      where: {
        userId: input.userId,
        contentType_contentId: {
          contentType: input.contentType,
          contentId: input.contentId,
        },
      },
    });
    return found ? factCheckSessionMapper.toDomain(found) : null;
  },

  async findAllByUserId(userId: string): Promise<FactCheckSession[]> {
    const found = await prisma.factCheckSession.findMany({
      where: { userId },
    });
    return found.map(factCheckSessionMapper.toDomain);
  },

  async delete(id: string): Promise<void> {
    await prisma.factCheckSession.delete({
      where: { id },
    });
  },
};

export default factCheckSessionRepo;
