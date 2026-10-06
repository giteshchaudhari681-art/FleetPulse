import Redis from 'ioredis';
import { env } from '../config';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  retryStrategy: (times) => {
    // Basic retry strategy for transient errors during runtime
    // Avoid aggressive reconnections in simple foundation
    return Math.min(times * 50, 2000);
  },
  maxRetriesPerRequest: 3,
});

redis.on('error', (err) => {
  // Only log if it's a runtime error, startup errors are handled in connectRedis
  if (redis.status === 'ready') {
    console.error('Redis runtime error:', err);
  }
});

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
    // Validate the connection works by sending a PING
    await redis.ping();
  } catch (error) {
    throw new Error(
      `Failed to connect to Redis: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redis.status !== 'end') {
    await redis.quit();
  }
}
