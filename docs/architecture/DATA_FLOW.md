# Data Flow

## 1. Telemetry Ingestion Flow
1. Simulator publishes `{ vehicleId, lat, lng, speed, fuel, temp, timestamp }` to MQTT topic `fleetpulse/vehicles/{vehicleId}/telemetry`.
2. Backend API (MQTT Consumer) receives the payload.
3. Payload is validated using Zod schemas.
4. If valid, the current state in Redis is updated (Upsert).
5. The raw/normalized data is asynchronously batched and inserted into TimescaleDB.
6. An internal event is emitted to the WebSocket manager for connected clients tracking this vehicle/fleet.

## 2. API Request Flow (CRUD)
1. User requests `GET /api/v1/fleets`.
2. Fastify controller receives the request.
3. Authentication/Authorization middleware verifies the JWT and permissions.
4. The service layer queries PostgreSQL.
5. The response is validated/formatted and returned to the client.

## 3. Alerting Flow
1. Telemetry triggers the Alert Rule Engine during ingestion.
2. If `speed > limit`, an Alert is generated.
3. The Alert is saved to PostgreSQL.
4. A notification is pushed via WebSockets to active dashboard users.
