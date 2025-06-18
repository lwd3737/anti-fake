import { Claim } from '@/models/claim';
import { Claim as PrismaClaim } from '/prisma/generated/prisma';

const claimMapper = {
  toDomain(record: PrismaClaim): Claim {
    const metadata = record.metadata as { startAt: number; endAt: number };

    return {
      id: record.id,
      index: record.index,
      content: record.content,
      detectionReason: record.detectionReason,
      startAt: metadata?.startAt,
      endAt: metadata?.endAt,
    };
  },
};

export default claimMapper;
