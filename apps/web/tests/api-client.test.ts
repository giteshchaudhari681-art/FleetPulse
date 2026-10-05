import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '../src/lib/api/client';
import { ApiError } from '../src/lib/api/errors';

describe('API Client', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('successfully fetches data', async () => {
    const mockData = { test: 'data' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
      status: 200,
    });

    const result = await apiClient('/test');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.any(Object)
    );
  });

  it('throws ApiError on HTTP error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Bad Request' }),
      status: 400,
    });

    await expect(apiClient('/test')).rejects.toThrow(ApiError);
    await expect(apiClient('/test')).rejects.toThrow('Bad Request');
  });

  it('handles network errors', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));

    await expect(apiClient('/test')).rejects.toThrow(ApiError);
    await expect(apiClient('/test')).rejects.toThrow('Network failure');
  });
});
