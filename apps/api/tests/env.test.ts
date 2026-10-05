import { describe, it, expect } from 'vitest';
import { loadServerConfig } from '@fleetpulse/config';

describe('Environment Configuration', () => {
  it('should load default values if not provided', () => {
    const env = loadServerConfig({});
    expect(env.NODE_ENV).toBe('development');
    expect(env.PORT).toBe(3000);
    expect(env.API_PREFIX).toBe('/api/v1');
  });

  it('should correctly parse provided values', () => {
    const env = loadServerConfig({
      NODE_ENV: 'production',
      PORT: '4000',
    });
    expect(env.NODE_ENV).toBe('production');
    expect(env.PORT).toBe(4000);
  });
});
