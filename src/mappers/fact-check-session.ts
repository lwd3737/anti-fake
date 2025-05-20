import { ContentType, FactCheckSession } from '@/models/fact-check-session';
import { FactCheckSession as PrismaFactCheckSession } from '/prisma/generated/prisma';

export const toDomainFactCheckSession = (
  record: PrismaFactCheckSession,
): FactCheckSession => {
  return {
    id: record.id,
    userId: record.userId,
    contentType: record.contentType as ContentType,
    contentId: record.contentId,
  };
};
