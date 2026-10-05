import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api/client';
import type { HealthResponse } from '../../types/api';
import { ErrorMessage } from '../../components/common/error-message';
import { LoadingSpinner } from '../../components/common/loading';

export function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient<HealthResponse>('/api/v1/health');
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm border border-surface-200 p-8 text-center">
        <h2 className="text-3xl font-bold text-surface-900 mb-4">FleetPulse</h2>
        <p className="text-lg text-surface-600 max-w-2xl mx-auto">
          Real-Time Fleet Telemetry & Intelligence Platform
        </p>
        <p className="mt-4 text-sm text-surface-500">Frontend Application Foundation (PR 03)</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">System Status</h3>

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage
            title="Backend Connection Failed"
            message={error}
            action={{ label: 'Retry Connection', onClick: checkHealth }}
          />
        )}

        {health && (
          <div className="bg-white rounded-lg shadow-sm border border-surface-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className="font-medium text-surface-900">Backend Connected</h4>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-50 p-4 rounded-md border border-surface-100">
                <dt className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">
                  Status
                </dt>
                <dd className="text-sm font-semibold text-green-700 capitalize">{health.status}</dd>
              </div>
              <div className="bg-surface-50 p-4 rounded-md border border-surface-100">
                <dt className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">
                  Version
                </dt>
                <dd className="text-sm font-mono text-surface-700">{health.version}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>
    </div>
  );
}
