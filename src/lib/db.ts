import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  __dbInitialized: boolean | undefined
}

// On production (Railway/Vercel/Netlify), the /tmp database may not have
// tables yet because the build container and run container are different.
// We run prisma db push at runtime to ensure the schema exists.
function ensureSchema() {
  if (globalForPrisma.__dbInitialized) return
  try {
    execSync('npx prisma db push --accept-data-loss --skip-generate', {
      stdio: 'pipe',
      timeout: 30000,
    })
    globalForPrisma.__dbInitialized = true
  } catch (e) {
    // Schema push failed — will retry on next request
    console.error('[db] prisma db push failed:', e)
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Ensure schema exists on first import (production only)
if (process.env.NODE_ENV === 'production' && !globalForPrisma.__dbInitialized) {
  ensureSchema()
}
