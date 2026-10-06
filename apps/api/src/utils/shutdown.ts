import { FastifyInstance } from 'fastify';
import { disconnectDatabase } from '../database/client';
import { disconnectRedis } from '../redis/client';

export function setupGracefulShutdown(app: FastifyInstance) {
  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}. Starting graceful shutdown...`);

    try {
      await app.close();
      await disconnectRedis();
      await disconnectDatabase();
      app.log.info('Graceful shutdown completed.');
      process.exit(0);
    } catch (err) {
      app.log.error(err, 'Error during graceful shutdown');
      process.exit(1);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}
