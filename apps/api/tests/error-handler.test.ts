import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app';

describe('Error Handling', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp();
    
    // Inject a dummy route to test application error
    app.get('/api/v1/test-error', async () => {
      const { AppError } = await import('../src/errors/app-error');
      throw AppError.badRequest('This is a test bad request');
    });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 404 for unknown routes', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/unknown-route-that-does-not-exist',
    });

    expect(response.statusCode).toBe(404);
    const json = response.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('NOT_FOUND');
    expect(json).toHaveProperty('requestId');
  });

  it('should properly format AppError responses', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/test-error',
    });

    expect(response.statusCode).toBe(400);
    const json = response.json();
    expect(json.success).toBe(false);
    expect(json.error.code).toBe('BAD_REQUEST');
    expect(json.error.message).toBe('This is a test bad request');
    expect(json).toHaveProperty('requestId');
  });
});
