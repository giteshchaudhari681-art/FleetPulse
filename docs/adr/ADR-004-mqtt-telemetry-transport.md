# ADR 004: MQTT for Telemetry Transport

## Status
Accepted

## Context
Vehicles (or simulators) need a reliable, lightweight protocol to send telemetry data to the backend at high frequency.

## Decision
We will use MQTT with Eclipse Mosquitto as the broker.

## Alternatives Considered
- HTTP POST: High overhead per message, less ideal for constant high-frequency streams.
- WebSockets: Good for browsers, but MQTT is the industry standard for IoT and vehicle telemetry, providing QoS levels.

## Consequences
- Industry-standard protocol compatibility.
- Decouples telemetry ingestion from business logic; Mosquitto handles connections, and the backend simply subscribes to topics.
