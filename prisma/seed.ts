import { PrismaClient } from '@/generated/prisma/client';
import { OauthProviderType, UserRole } from '@/models/user';
import { PrismaPg } from '@prisma/adapter-pg';

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required for seeding');
  }
  //const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient();

  const Config = {
    USER_COUNT: 3,
  };

  const seed = async () => {
    await Promise.all([
      createAdmin(),
      // createUsers()
    ]);
  };

  const createAdmin = async () => {
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
  };

  const createUsers = async () => {
    for (let i = 0; i < Config.USER_COUNT; i++) {
      await prisma.user.create({
        data: {
          provider: OauthProviderType.GOOGLE,
          email: `test${i}@gmail.com`,
          role: UserRole.USER,
        },
      });
    }
  };

  seed().finally(async () => {
    await prisma.$disconnect();
  });
}
