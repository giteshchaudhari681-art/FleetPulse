import { buildApp } from './app';
import { env } from './config';
import { connectDatabase } from './database/client';
import { connectRedis } from './redis/client';
import { setupGracefulShutdown } from './utils/shutdown';

async function startServer() {
  const app = buildApp();

  try {
    setupGracefulShutdown(app);

    // Connect to the database before starting the HTTP server
    app.log.info('Connecting to database...');
    await connectDatabase();
    app.log.info('Connected to database successfully');

    app.log.info('Connecting to Redis...');
    await connectRedis();
    app.log.info('Connected to Redis successfully');

    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });

    app.log.info(`Server started correctly on ${env.HOST}:${env.PORT}`);
  } catch (err) {
    app.log.error(err, 'Failed to start server');
    process.exit(1);
  }
}

startServer();
