# ADR 009: Pino and OpenTelemetry

## Status
Accepted

## Context
A distributed system with MQTT ingestion, background processing, and real-time outputs needs robust observability to diagnose issues in production.

## Decision
We will use Pino for structured JSON logging and OpenTelemetry for distributed tracing.

## Alternatives Considered
- Winston: Good, but Pino is significantly faster and natively JSON-structured, which integrates well with Fastify.
- Proprietary Tracing SDKs (e.g. Datadog native): Ties us to a specific vendor. OpenTelemetry is vendor-agnostic.

## Consequences
- Logs will be structured and machine-readable.
- OpenTelemetry requires infrastructure to collect and visualize traces, which will be provisioned in later PRs.
