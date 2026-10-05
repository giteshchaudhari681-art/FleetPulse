# ADR 006: Redis for Live State

## Status
Accepted

## Context
When a client connects to the dashboard, it needs the absolute latest state of the fleet immediately. Querying TimescaleDB for the "latest row" for thousands of vehicles per connection is inefficient.

## Decision
We will use Redis to store the latest known state of every vehicle.

## Alternatives Considered
- In-memory Map in Node.js: Does not scale horizontally.
- RDBMS Queries: Too slow for high-frequency reads of current state.

## Consequences
- Redis provides near-instant access to the latest state for new WebSocket connections.
- Requires maintaining consistency between TimescaleDB (historical) and Redis (current).
