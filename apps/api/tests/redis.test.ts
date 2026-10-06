import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { redis, connectRedis, disconnectRedis } from '../src/redis/client';
import { env } from '../src/config';

describe('Redis Integration', () => {
  beforeAll(async () => {
    // Only test if we're not explicitly opting out, similar to DB integration.
    // In our CI and local, REDIS_URL will be present and valid.
    if (env.REDIS_URL) {
      try {
        await connectRedis();
      } catch (e) {
        if (process.env.CI) {
          throw e;
        } else {
          console.warn('Skipping Redis connect in beforeAll locally due to connection failure');
        }
      }
    }
  });

  afterAll(async () => {
    if (env.REDIS_URL) {
      await disconnectRedis();
    }
  });

  it('should successfully execute a ping against Redis', async () => {
    // In local development, redis might not be running unless explicitly started.
    // In CI, it will be running. We gracefully skip if connection fails locally.
    try {
      const result = await redis.ping();
      expect(result).toBe('PONG');
    } catch (e) {
      if (process.env.CI) {
        throw e;
      } else {
        console.warn('Skipping Redis ping test locally due to connection failure');
      }
    }
  });
});
