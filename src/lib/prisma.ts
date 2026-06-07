/**
 * src/lib/prisma.ts — Singleton PrismaClient instance
 *
 * Prisma 7's `prisma-client` generator requires an explicit driver adapter;
 * it no longer auto-reads DATABASE_URL from the environment.
 *
 * This singleton ensures a single PrismaClient instance is shared across all
 * hot-module-replacement cycles in development, preventing connection pool
 * exhaustion from creating a new client on every file save.
 *
 * Rule: This is the ONLY file that instantiates PrismaClient.
 * All data access must go through src/lib/repository.ts.
 */

import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Extend the global Node.js namespace to hold the cached Prisma instance
// across Next.js hot-module-replacement cycles in development.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.');
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Re-use the cached instance in development to avoid exhausting the pool.
// In production, always create a fresh instance per worker process.
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
