# Configuration Architecture

## Principles

The FleetPulse configuration architecture strictly separates configuration into validated schemas rather than reading raw environment variables (`process.env`) directly across the application.

1. **Fail Fast**: Invalid environment values crash the application immediately at startup.
2. **Strong Typing**: Values are parsed into their correct types (e.g. `"3000"` becomes the number `3000`).
3. **Zod Validation**: We use `zod` schemas to define acceptable bounds for configuration.
4. **No Secret Leakage**: The backend/server configuration schema is strictly isolated from the frontend/public configuration schema.

## Structure

Configuration is centralized in the `@fleetpulse/config` workspace package.

- **`@fleetpulse/config/server`**: For Node.js (backend) applications. Exports `serverConfig` populated automatically from `process.env`.
- **`@fleetpulse/config/public`**: For browser (frontend) applications. Exports `loadPublicConfig()` which must be explicitly called by the frontend bundler's mechanism (e.g., Vite's `import.meta.env`).

## Boundaries

Frontend applications **must never** import from `@fleetpulse/config/server`. Doing so will fail (or accidentally bundle secrets, if bypassed). The build pipelines structurally enforce this by distinguishing browser-safe and server-only modules.

## Adding a New Variable

1. Identify whether the variable is server-side (e.g. database credentials) or public (e.g. API URL).
2. Add the variable to the corresponding schema in `packages/config/src/server.ts` or `packages/config/src/public.ts`.
3. Add a safe development default if appropriate.
4. Update `.env.example` to document the variable.

## Development Environment

Developers configure local overrides using a `.env` file at the repository root. This file is ignored by Git.

**Important**: Do not commit secrets to `.env.example` or any source-controlled file.
