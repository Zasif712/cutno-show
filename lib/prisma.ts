// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Use global This to preserve the client across hot-reloads in development
const globalForPrisma = (globalThis as any) as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}
