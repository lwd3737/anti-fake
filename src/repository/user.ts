import prisma from './prisma';
import { OauthProvider, Prisma, User } from '/prisma/generated/prisma';

export const upsertUser = async ({
  email,
  providerSub,
  refreshToken,
}: Pick<User, 'email' | 'providerSub' | 'refreshToken'>) => {
  return await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      providerSub,
      refreshToken,
    },
    create: {
      email,
      provider: OauthProvider.GOOGLE,
      providerSub,
      refreshToken,
    },
    select: {
      id: true,
    },
  });
};

export const getUser = async (
  input: {
    provider: OauthProvider;
    providerSub: NonNullable<User['providerSub']>;
  },
  select?: Prisma.UserSelect,
) => {
  return await prisma.user.findUnique({
    where: {
      provider_providerSub: input,
    },
    select,
  });
};
