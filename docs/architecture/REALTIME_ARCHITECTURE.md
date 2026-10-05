# Realtime Architecture

## Transport
- The transport layer for browser-to-backend realtime communication is **WebSockets**.
- The transport layer for device-to-backend realtime communication is **MQTT**.

## Connection Lifecycle
1. Dashboard authenticates via REST and retrieves a WebSocket ticket/token.
2. Dashboard opens a WebSocket connection to the Fastify API.
3. API validates the ticket and establishes the session.
4. Dashboard subscribes to specific fleet or vehicle updates.
5. API pushes messages derived from Redis/MQTT updates to the relevant connections.

## Resilience
- The client must implement exponential backoff reconnection logic.
- Upon reconnection, the client should request a state sync to recover any missed events, pulling the latest known state from Redis via REST before resuming WS consumption.

## Event Ordering
- Events are timestamped at the origin (Simulator).
- Out-of-order events (where the timestamp is older than the current known state) will be discarded or processed appropriately by the dashboard to prevent "jumping" backwards on the map.
