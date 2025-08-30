import { Claim } from '@/models/claim';
import { Claim as PrismaClaim } from '@/generated/prisma/client';

const claimMapper = {
  fromPersistence(record: PrismaClaim): Claim {
    const metadata = record.metadata as { startAt: number; endAt: number };

    return {
      id: record.id,
      index: record.index,
      content: record.content,
      context: record.context,
      detectionReason: record.detectionReason,
      startAt: metadata?.startAt,
      endAt: metadata?.endAt,
    };
  },
};

export default claimMapper;
