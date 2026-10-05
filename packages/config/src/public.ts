import { z } from 'zod';

export const publicConfigSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('http://localhost:3000'),
});

export type PublicConfig = z.infer<typeof publicConfigSchema>;

export function loadPublicConfig(env: Record<string, string | undefined>): PublicConfig {
  const parsed = publicConfigSchema.safeParse(env);
  if (!parsed.success) {
    console.error('❌ Invalid public environment variables:', parsed.error.format());
    throw new Error('Invalid public environment variables');
  }
  return parsed.data;
}
