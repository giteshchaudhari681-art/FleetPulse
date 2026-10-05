# Architecture

## System Responsibilities
FleetPulse is divided into several discrete responsibilities:

1. **Simulation:** A Python-based vehicle simulator that produces GPS and sensor telemetry.
2. **Ingestion & Transport:** An MQTT broker (Mosquitto) acting as the high-throughput, low-latency entry point.
3. **Core API & Processing:** A Node.js (Fastify) backend that handles business logic, fleet management, telemetry ingestion (MQTT consumer), and data normalization.
4. **Data Storage:** 
    - PostgreSQL for relational data (Fleets, Vehicles, Drivers, Users).
    - TimescaleDB for time-series telemetry storage (Historical).
    - Redis for the latest vehicle state and caching.
5. **Real-Time Delivery:** WebSockets pushing live vehicle updates to connected clients.
6. **Frontend Dashboard:** A React (Vite) application for visualizing fleets, maps, and historical analytics.

## Architectural Principles
1. **Separation of concerns:** Frontend, API, domain logic, infrastructure, persistence, messaging, and simulation must remain clearly separated.
2. **Domain-driven organization:** Business logic must not become scattered across controllers.
3. **Type safety:** Use TypeScript and Zod at appropriate boundaries.
4. **Validation at boundaries:** Untrusted data must be validated before entering domain logic.
5. **Explicit contracts:** API and event contracts must be documented.
6. **Observability:** Important runtime behavior must eventually be observable.
7. **Testability:** Infrastructure-dependent functionality must be designed for integration testing.
8. **Failure awareness:** MQTT, Redis, WebSockets, and databases are external dependencies and must be treated as failure-prone.
9. **Security by default:** Authentication, authorization, validation, rate limiting, and secure configuration must be considered from the beginning.
