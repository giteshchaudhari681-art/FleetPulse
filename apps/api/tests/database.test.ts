import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma, connectDatabase, disconnectDatabase } from '../src/database/client';

describe('Database Integration', () => {
  beforeAll(async () => {
    // Only test if we have a real database URL (like in CI or local full run)
    if (process.env.DATABASE_URL) {
      await connectDatabase();
    }
  });

  afterAll(async () => {
    if (process.env.DATABASE_URL) {
      await disconnectDatabase();
    }
  });

  it('should successfully execute a raw query against PostgreSQL', async () => {
    // Skip if no real database is provided to avoid breaking local dev without docker
    if (!process.env.DATABASE_URL) {
      console.warn('Skipping database integration test: DATABASE_URL not set');
      return;
    }

    const result = await prisma.$queryRaw`SELECT 1 as result`;
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect((result as any[])[0].result).toBe(1);
  });
});
