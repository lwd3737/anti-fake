import { User as PrismaUser } from '/prisma/generated/prisma';
import { OauthProviderType, UserRole, User } from '@/models/user';

export const toDomainUser = (record: PrismaUser): User => {
  return {
    id: record.id,
    email: record.email,
    provider: record.provider as OauthProviderType,
    providerSub: record.providerSub!,
    role: record.role as UserRole,
  };
};
