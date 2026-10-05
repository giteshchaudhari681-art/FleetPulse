import { FastifyInstance } from 'fastify';
import { healthRoutes } from './health';

export async function registerRoutes(fastify: FastifyInstance, prefix: string) {
  fastify.register(healthRoutes, { prefix });
}
