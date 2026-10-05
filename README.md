# FleetPulse

FleetPulse is a real-time fleet telemetry and vehicle intelligence platform. It enables operators to monitor, manage, and analyze fleet operations seamlessly.

> **Note:** FleetPulse is currently under staged development. 
> PR 01 — Foundation: completed
> PR 02 — Backend Bootstrap: completed

## Key Capabilities (Planned)
- Real-time vehicle monitoring and map visualization.
- Telemetry ingestion (speed, fuel, temperature).
- Alerting for overspeeding, low fuel, and geofence violations.
- Historical route and trip analysis.
- Preventative maintenance scheduling.

## Architecture Overview
The platform uses a modern, event-driven architecture:
- **Simulator:** Python-based telemetry generator.
- **Messaging:** Eclipse Mosquitto (MQTT).
- **Backend API:** Node.js / Fastify.
- **Persistence:** PostgreSQL (Domain), TimescaleDB (Time-Series), Redis (Live State).
- **Frontend:** React / Vite Dashboard with real-time WebSockets.

## Repository Structure
```
FleetPulse/
├── apps/               # Frontend and API
├── services/           # Python Simulator and microservices
├── packages/           # Shared libraries (config, validation)
├── infrastructure/     # Docker, MQTT config, deployments
├── docs/               # Architecture, Product specs, ADRs
├── tests/              # End-to-end tests
└── scripts/            # Build and verification scripts
```

## 100-PR Roadmap
This project is strictly structured across exactly 100 sequential Pull Requests. 
See the full sequence in `docs/product/ROADMAP.md`.

## Local Development
Prerequisites:
- Node.js >= 20
- Docker & Docker Compose
- Python >= 3.10
- Git

## Testing Strategy
- Unit and Integration tests will be implemented via Vitest and Supertest.
- Infrastructure and e2e testing will utilize Testcontainers.
- Current tests include structural and roadmap integrity verification.

## Continuous Integration
Automated quality gates are implemented via GitHub Actions to ensure structural compliance, documentation integrity, and (eventually) code quality.
