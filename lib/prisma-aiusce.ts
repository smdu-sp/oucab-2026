import { PrismaClient } from "./generated/aiusce";

declare global {
  var prismaAiusce: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prismaAiusce: PrismaClient | undefined;
};

export const dbAiusce = globalForPrisma.prismaAiusce || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaAiusce = dbAiusce;
