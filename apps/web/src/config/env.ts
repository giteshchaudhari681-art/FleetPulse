import { loadPublicConfig } from '@fleetpulse/config';

// We must explicitly pass the variables from Vite's import.meta.env
// because process.env is not available in the browser.
export const env = loadPublicConfig({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});
