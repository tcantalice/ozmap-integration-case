import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export const closeConnection = async () => {
  await prisma.$disconnect();
};
