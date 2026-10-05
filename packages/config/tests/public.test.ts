import { describe, it, expect } from 'vitest';
import { loadPublicConfig } from '../src/public';

describe('Public Configuration', () => {
  it('validates valid public environment configuration', () => {
    const validEnv = {
      VITE_API_BASE_URL: 'https://api.fleetpulse.com',
    };

    const config = loadPublicConfig(validEnv);
    
    expect(config.VITE_API_BASE_URL).toBe('https://api.fleetpulse.com');
  });

  it('uses safe defaults when values are missing', () => {
    const config = loadPublicConfig({});
    
    expect(config.VITE_API_BASE_URL).toBe('http://localhost:3000');
  });

  it('fails clearly on invalid URL format', () => {
    const invalidEnv = {
      VITE_API_BASE_URL: 'not-a-valid-url',
    };

    expect(() => loadPublicConfig(invalidEnv)).toThrow('Invalid public environment variables');
  });

  it('ignores server-only variables', () => {
    const mixedEnv = {
      VITE_API_BASE_URL: 'https://api.fleetpulse.com',
      JWT_SECRET: 'secret-value',
      DATABASE_URL: 'postgres://localhost:5432'
    };

    const config = loadPublicConfig(mixedEnv);
    
    // Explicitly casting to any to check for property absence safely
    expect((config as any).JWT_SECRET).toBeUndefined();
    expect((config as any).DATABASE_URL).toBeUndefined();
    expect(config.VITE_API_BASE_URL).toBe('https://api.fleetpulse.com');
  });
});
