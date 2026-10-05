import fastify from 'fastify';
import crypto from 'crypto';
import { env } from './config';
import { errorHandler, notFoundHandler } from './errors/error-handler';
import { corsPlugin } from './plugins/cors';
import { securityPlugin } from './plugins/security';
import { registerRoutes } from './routes';

export function buildApp() {
  const app = fastify({
    logger: {
      level: env.LOG_LEVEL,
      ...(env.NODE_ENV === 'development'
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            },
          }
        : {}),
    },
    genReqId: (req) => (req.headers['x-request-id'] as string) || crypto.randomUUID(),
  });

  // Plugins
  app.register(corsPlugin);
  app.register(securityPlugin);

  // Routes
  registerRoutes(app, env.API_PREFIX);

  // Global Error Handlers
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  return app;
}
