import { User as PrismaUser } from '@prisma/client';
import { OauthProviderType, UserRole, User } from '@/models/user';

const userMapper = {
  toDomain(record: PrismaUser): User {
    return {
      id: record.id,
      email: record.email,
      provider: record.provider as OauthProviderType,
      providerSub: record.providerSub!,
      role: record.role as UserRole,
      refreshToken: record.refreshToken,
    };
  },
};

export default userMapper;
