import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { env } from '../config';

export const corsPlugin = fp(async (fastify) => {
  await fastify.register(cors, {
    origin: env.NODE_ENV === 'development' ? [env.CORS_ORIGIN] : env.CORS_ORIGIN,
    credentials: true,
  });
});
