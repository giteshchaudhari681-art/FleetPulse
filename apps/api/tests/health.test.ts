import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app';

vi.mock('../src/database/client', () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

describe('Health Routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health should return ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/health',
    });

    expect(response.statusCode).toBe(200);
    const json = response.json();
    expect(json.status).toBe('ok');
    expect(json.service).toBe('fleetpulse-api');
    expect(json).toHaveProperty('timestamp');
  });

  it('GET /api/v1/ready should return ready', async () => {
    // Mock the queryRaw to succeed
    const { prisma } = await import('../src/database/client');
    vi.mocked(prisma.$queryRaw).mockResolvedValueOnce([{ '?column?': 1 }]);

    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/ready',
    });

    expect(response.statusCode).toBe(200);
    const json = response.json();
    expect(json.status).toBe('ready');
  });

  it('GET /api/v1/ready should return 503 if DB is down', async () => {
    const { prisma } = await import('../src/database/client');
    vi.mocked(prisma.$queryRaw).mockRejectedValueOnce(new Error('Connection failed'));

    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/ready',
    });

    expect(response.statusCode).toBe(503);
    const json = response.json();
    expect(json.status).toBe('error');
    expect(json.message).toBe('Infrastructure not ready');
  });

  it('should include request id in response headers', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/health',
    });

    expect(response.statusCode).toBe(200);
  });
});
