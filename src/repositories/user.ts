import { User } from '@/models/user';
import prisma from './prisma';
import { toDomainUser } from '@/mappers/user';

export const upsertUser = async (
  input: Pick<User, 'email' | 'provider' | 'providerSub' | 'refreshToken'>,
): Promise<Pick<User, 'id'>> => {
  return await prisma.user.upsert({
    where: {
      email: input.email,
    },
    update: {
      providerSub: input.providerSub,
      refreshToken: input.refreshToken,
    },
    create: {
      email: input.email,
      provider: input.provider,
      providerSub: input.providerSub,
      refreshToken: input.refreshToken,
    },
    select: {
      id: true,
    },
  });
};

export const getUser = async (
  input: Pick<User, 'provider' | 'providerSub'>,
): Promise<User | null> => {
  const found = await prisma.user.findUnique({
    where: {
      provider_providerSub: input,
    },
  });
  return found ? toDomainUser(found) : null;
};
