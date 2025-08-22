import loadConfig from '@/config';
import { OauthProviderType, UserRole } from '@/models/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Config = {
  USER_COUNT: 3,
};

async function seed() {
  await Promise.all([
    createAdmin(),
    // createUsers()
  ]);
}

async function createAdmin() {
  await prisma.user.create({
    data: {
      provider: OauthProviderType.GOOGLE,
      email: loadConfig().admin.email,
      role: UserRole.ADMIN,
    },
  });
}

async function createUsers() {
  for (let i = 0; i < Config.USER_COUNT; i++) {
    await prisma.user.create({
      data: {
        provider: OauthProviderType.GOOGLE,
        email: `test${i}@gmail.com`,
        role: UserRole.USER,
      },
    });
  }
}

seed();
