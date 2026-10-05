import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clear dom after each test
afterEach(() => {
  cleanup();
});
