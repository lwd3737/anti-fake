import { FactCheckSession } from '@/models/fact-check-session';
import prisma from './prisma';
import { toDomainFactCheckSession } from '@/mappers/fact-check-session';

export const getFactCheckSession = async (
  input: Pick<FactCheckSession, 'userId' | 'contentType' | 'contentId'>,
): Promise<FactCheckSession | null> => {
  const found = await prisma.factCheckSession.findUnique({
    where: {
      userId: input.userId,
      contentType_contentId: {
        contentType: input.contentType,
        contentId: input.contentId,
      },
    },
  });
  return found ? toDomainFactCheckSession(found) : null;
};

export const createFactCheckSession = async (
  input: Pick<FactCheckSession, 'userId' | 'contentType' | 'contentId'>,
): Promise<FactCheckSession> => {
  const created = await prisma.factCheckSession.create({
    data: input,
  });
  return toDomainFactCheckSession(created);
};
