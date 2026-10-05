import { FastifyInstance } from 'fastify';

export function setupGracefulShutdown(app: FastifyInstance) {
  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}. Starting graceful shutdown...`);

    try {
      // Future: Close DB connection, Redis, MQTT here
      await app.close();
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
