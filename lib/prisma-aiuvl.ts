import { PrismaClient } from "./generated/aiuvl";

declare global {
  var prismaAiuvl: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prismaAiuvl: PrismaClient | undefined;
};

export const dbAiuvl = globalForPrisma.prismaAiuvl || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaAiuvl = dbAiuvl;
