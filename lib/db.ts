import { PrismaClient } from '../prisma/generated-client'
import { PrismaD1 } from '@prisma/adapter-d1'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient;

if (process.env.DEV_REMOTE === 'true' && process.env.TYPAMINE_DB) {
  // Use Cloudflare D1
  const adapter = new PrismaD1(process.env.TYPAMINE_DB as any)
  prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
} else {
  // Use Local SQLite
  prisma = globalForPrisma.prisma || new PrismaClient()
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const db = prisma
