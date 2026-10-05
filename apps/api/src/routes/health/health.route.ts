import { FastifyInstance } from 'fastify';

import { prisma } from '../../database/client';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    return reply.send({
      status: 'ok',
      service: 'fleetpulse-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });

  fastify.get('/ready', async (request, reply) => {
    try {
      // Execute a lightweight query to verify the database is available
      await prisma.$queryRaw`SELECT 1`;
      return reply.send({
        status: 'ready',
        service: 'fleetpulse-api',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      fastify.log.error(error, 'Database readiness check failed');
      return reply.status(503).send({
        status: 'error',
        service: 'fleetpulse-api',
        message: 'Infrastructure not ready',
        timestamp: new Date().toISOString(),
      });
    }
  });
}
