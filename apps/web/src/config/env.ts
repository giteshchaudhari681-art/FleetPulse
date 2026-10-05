import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('http://localhost:3000'),
});

// Use default values for standard development
const parsedEnv = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

if (!parsedEnv.success) {
  console.error('Invalid frontend environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
