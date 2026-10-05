# FleetPulse API

This is the backend API for the FleetPulse platform, built with Node.js, Fastify, and TypeScript.

## Purpose
The API serves as the core orchestration and business logic layer. It will eventually handle fleet management, telemetry processing, alerting, and real-time WebSocket communication.

## Architecture
- **App/Server Separation**: `src/app.ts` is responsible for registering plugins and routes but does not start the listening socket. `src/server.ts` imports the configured app and starts the server. This is critical for isolated integration testing.
- **Configuration**: Uses Zod in `src/config/env.ts` to guarantee type-safe environment variables at startup.
- **Routing**: Modular routing starts at `src/routes/index.ts`. All endpoints are prefixed with `/api/v1`.
- **Error Handling**: Centralized in `src/errors/error-handler.ts`. Custom application errors are thrown using the `AppError` class.
- **Shutdown**: Graceful shutdown handles `SIGINT` and `SIGTERM` signals cleanly in `src/utils/shutdown.ts`.

## Setup
Install dependencies from the repository root:
```bash
npm install
```

## Environment Variables
The application expects the environment variables documented in the root `.env.example`. 

Key variables for this service:
- `NODE_ENV` (development | test | production)
- `PORT` (default 3000)
- `HOST` (default 0.0.0.0)
- `LOG_LEVEL` (default info)
- `API_PREFIX` (default /api/v1)

## Scripts
- `npm run dev` - Start development server using `tsx` with hot reload.
- `npm run build` - Compile TypeScript to `dist/`.
- `npm start` - Run the compiled output.
- `npm test` - Run unit/integration tests with Vitest.
- `npm run typecheck` - Validate TypeScript without emitting files.
- `npm run format` - Format code with Prettier.
- `npm run lint` - Lint code with ESLint.

## Health and Readiness
- **GET `/api/v1/health`**: Liveness probe. Returns immediately if the process is running.
- **GET `/api/v1/ready`**: Readiness probe. In future PRs, this will check downstream services (DB, Redis, MQTT) before returning ready.

## Error Response Format
All managed errors are returned in a standard structure:
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Detailed error message"
  },
  "requestId": "uuid"
}
```

## Logging
Logging uses `pino`. In development, logs are pretty-printed. In production, logs are strictly structured JSON.
