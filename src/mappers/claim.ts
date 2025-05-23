import { Claim } from '@/models/claim';
import { Claim as PrismaClaim } from '/prisma/generated/prisma';

const claimMapper = {
  toDomain(record: PrismaClaim): Claim {
    return {
      id: record.id,
      index: record.index,
      content: record.content,
      detectionReason: record.detectionReason,
    };
  },
};

export default claimMapper;
