import loadConfig from '@/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: loadConfig().databaseUrl });
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
    adapter,
  });

if (loadConfig().nodeEnv !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
