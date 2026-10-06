# Redis Architecture

## Objective
Redis is established as the foundational distributed cache and fast-access memory store for FleetPulse. Its primary role in future PRs will be supporting the low-latency real-time telemetry processing pipeline and WebSocket operations (such as caching the latest vehicle state), without acting as the system of record.

## Technology Choice
- **Redis Engine**: Redis 7 (Alpine)
- **Node.js Client**: `ioredis`
- **Reason**: `ioredis` is chosen over `redis` for its native promise support, robustness, advanced features (like cluster and sentinel support out of the box), and widespread adoption in enterprise Node.js environments.

## Configuration & Boundaries
The Redis connection string is provided as `REDIS_URL` strictly via the server-side configuration schema in `@fleetpulse/config/server`. It is never exposed to the frontend or `public` configurations.

## Lifecycle Management
A single centralized client instance is maintained in `apps/api/src/redis/client.ts`.
- **Startup**: `connectRedis()` is called during application initialization (before Fastify starts listening). A `PING` validates the connection. If it fails, the application gracefully exits, adhering to a strict infrastructure availability policy.
- **Shutdown**: During SIGINT/SIGTERM, `disconnectRedis()` is invoked cleanly before process exit.

## Readiness Probes
The `/ready` health route is configured to require both PostgreSQL and Redis. A request to `/ready` triggers a Redis `PING` in parallel with a PostgreSQL `SELECT 1` query. A failure in either dependency returns an immediate `503 Service Unavailable`. 
The standard `/health` endpoint remains a simple Liveness Probe and does not test Redis.

## Local Development
Local Redis infrastructure is provided via `docker-compose.yml`, exposing port 6379 natively.

## Security
No production secrets are committed. Connection details remain decoupled from the application logic. Internally surfaced exceptions on the `/ready` route are caught and generalized so that internal network topologies or connection strings never leak externally.

## Intentional Limitations (PR 06 Boundary)
Currently, no application-level caching, state management, session store, or queue operations are implemented. This module merely serves as the required underlying infrastructure for future application features to safely consume.
