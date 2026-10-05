import type { ReactNode } from 'react';

const CURRENT_YEAR = new Date().getFullYear();

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 flex flex-col">
      <header className="bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">FP</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-surface-900">FleetPulse</h1>
        </div>
        <nav>{/* Future navigation items */}</nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>

      <footer className="bg-surface-100 border-t border-surface-200 px-6 py-4 text-sm text-surface-500 text-center">
        &copy; {CURRENT_YEAR} FleetPulse Operations. All rights reserved.
      </footer>
    </div>
  );
}
