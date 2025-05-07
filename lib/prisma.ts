// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Extend the global namespace to include `prisma`
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use existing client instance in development (hot reloads), otherwise create a new one
export const prisma = global.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}
