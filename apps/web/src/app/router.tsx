import { AppShell } from './app-shell';
import { HomePage } from '../pages/home/HomePage';

export function AppRouter() {
  // A simple router for now. Can be replaced with React Router later.
  return (
    <AppShell>
      <HomePage />
    </AppShell>
  );
}
