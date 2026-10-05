# ADR 002: Fastify Backend

## Status
Accepted

## Context
We need a robust, high-performance Node.js framework for the API and WebSocket server. The system expects high throughput telemetry and real-time processing.

## Decision
We will use Fastify as the primary web framework for the backend.

## Alternatives Considered
- Express: Popular but slower, requires more third-party middleware for basic features.
- NestJS: Highly structured but heavy and adds significant overhead.

## Consequences
- Better out-of-the-box performance and JSON validation via Fastify's schema-based serialization.
- Fastify ecosystem is well-maintained and provides robust plugins for WebSockets, CORS, and rate limiting.
