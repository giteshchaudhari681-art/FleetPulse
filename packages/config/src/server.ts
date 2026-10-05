import { z } from 'zod';

export const serverConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().url().default('postgresql://fleetpulse:fleetpulse_development_password@localhost:5432/fleetpulse_dev'),
});

export type ServerConfig = z.infer<typeof serverConfigSchema>;

export function loadServerConfig(env: Record<string, string | undefined>): ServerConfig {
  const parsed = serverConfigSchema.safeParse(env);
  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:', parsed.error.format());
    throw new Error('Invalid server environment variables');
  }
  return parsed.data;
}

// In standard Node.js server environments, we can automatically parse process.env
// We wrap it in a try-catch to ensure we don't crash when imported incorrectly 
// (though it shouldn't be imported in the browser anyway).
export const serverConfig = (() => {
  try {
    return loadServerConfig(process.env);
  } catch (e) {
    // We throw to fail fast on invalid config, but if process.env is undefined, it means we are not in Node.
    if (typeof process === 'undefined' || !process.env) {
      throw new Error('serverConfig cannot be accessed outside of a Node.js environment');
    }
    throw e;
  }
})();
