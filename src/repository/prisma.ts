import loadConfig from '@/config';
import { PrismaClient } from '/prisma/generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (loadConfig().nodeEnv !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
