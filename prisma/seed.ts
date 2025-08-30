import { OauthProviderType, UserRole } from '@/models/user';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required for seeding');
}
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

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
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL is required for seeding');
  }
  await prisma.user.create({
    data: {
      provider: OauthProviderType.GOOGLE,
      email: adminEmail,
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

seed().finally(async () => {
  await prisma.$disconnect();
});
