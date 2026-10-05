import type { ReactNode } from 'react';
import { ErrorBoundary } from '../components/feedback/error-boundary';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      {/* Future providers like Theme, QueryClient, Auth will go here */}
      {children}
    </ErrorBoundary>
  );
}
