import { FastifyInstance } from 'fastify';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    return reply.send({
      status: 'ok',
      service: 'fleetpulse-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0', // Could be dynamically injected
    });
  });

  fastify.get('/ready', async (request, reply) => {
    // In PR 02, there are no database or external dependencies to check.
    // Future PRs will check DB, Redis, MQTT, etc.
    return reply.send({
      status: 'ready',
      service: 'fleetpulse-api',
      timestamp: new Date().toISOString(),
    });
  });
}
