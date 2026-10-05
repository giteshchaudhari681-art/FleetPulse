import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadServerConfig, serverConfigSchema } from '../src/server';

describe('Server Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('validates valid environment configuration', () => {
    const validEnv = {
      NODE_ENV: 'production',
      PORT: '4000',
      HOST: '127.0.0.1',
      LOG_LEVEL: 'debug',
      API_PREFIX: '/api/v2',
      CORS_ORIGIN: 'http://example.com'
    };

    const config = loadServerConfig(validEnv);
    
    expect(config.NODE_ENV).toBe('production');
    expect(config.PORT).toBe(4000); // parsed numeric
    expect(config.HOST).toBe('127.0.0.1');
    expect(config.LOG_LEVEL).toBe('debug');
    expect(config.API_PREFIX).toBe('/api/v2');
    expect(config.CORS_ORIGIN).toBe('http://example.com');
  });

  it('uses safe defaults for missing configuration', () => {
    const config = loadServerConfig({});
    
    expect(config.NODE_ENV).toBe('development');
    expect(config.PORT).toBe(3000);
    expect(config.HOST).toBe('0.0.0.0');
    expect(config.LOG_LEVEL).toBe('info');
    expect(config.API_PREFIX).toBe('/api/v1');
    expect(config.CORS_ORIGIN).toBe('http://localhost:5173');
  });

  it('fails clearly on invalid numeric PORT', () => {
    const invalidEnv = { PORT: 'not-a-number' };
    
    expect(() => loadServerConfig(invalidEnv)).toThrow('Invalid server environment variables');
  });

  it('fails clearly on out-of-bounds PORT', () => {
    const invalidEnv = { PORT: '-100' };
    expect(() => loadServerConfig(invalidEnv)).toThrow('Invalid server environment variables');

    const invalidEnv2 = { PORT: '999999' };
    expect(() => loadServerConfig(invalidEnv2)).toThrow('Invalid server environment variables');
  });

  it('fails on unsupported environments', () => {
    const invalidEnv = { NODE_ENV: 'staging' };
    expect(() => loadServerConfig(invalidEnv)).toThrow('Invalid server environment variables');
  });
});
