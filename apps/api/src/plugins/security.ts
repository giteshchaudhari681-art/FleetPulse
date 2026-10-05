import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export const securityPlugin = fp(async (fastify) => {
  await fastify.register(helmet, {
    global: true,
  });
});
