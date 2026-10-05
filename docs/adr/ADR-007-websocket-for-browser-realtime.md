# ADR 007: WebSockets for Browser Realtime

## Status
Accepted

## Context
The frontend React dashboard requires real-time updates as vehicles move and sensors change state.

## Decision
We will use WebSockets for real-time communication between the Fastify backend and the React frontend.

## Alternatives Considered
- Server-Sent Events (SSE): Good for one-way streams, but WebSockets offer full-duplex communication and broader ecosystem support for dynamic subscriptions.
- Polling: Inefficient and introduces latency.

## Consequences
- Requires a robust WebSocket connection manager on the backend.
- Clients must handle reconnections gracefully.
