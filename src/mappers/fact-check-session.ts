import { ContentType, FactCheckSession } from '@/models/fact-check-session';
import { FactCheckSession as PrismaFactCheckSession } from '@/generated/prisma/client';

const factCheckSessionMapper = {
  toDomain(record: PrismaFactCheckSession): FactCheckSession {
    return {
      id: record.id,
      userId: record.userId,
      contentType: record.contentType as ContentType,
      contentId: record.contentId,
      createdAt: record.createdAt,
    };
  },
};

export default factCheckSessionMapper;
