import loadConfig from '@/config';
import { OauthProvider, PrismaClient, Role } from './generated/prisma';

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
      provider: OauthProvider.GOOGLE,
      email: loadConfig().admin.email,
      role: Role.ADMIN,
    },
  });
}

async function createUsers() {
  for (let i = 0; i < Config.USER_COUNT; i++) {
    await prisma.user.create({
      data: {
        provider: OauthProvider.GOOGLE,
        email: `test${i}@gmail.com`,
        role: Role.USER,
      },
    });
  }
}

seed();
