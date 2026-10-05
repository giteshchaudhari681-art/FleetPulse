# System Overview

The FleetPulse system is built on a loosely-coupled, event-driven foundation.

```mermaid
graph TD
    Sim[Python Vehicle Simulator] -->|Telemetry Publish| Broker(MQTT Broker - Mosquitto)
    Broker -->|Telemetry Consume| API[Node.js Fastify API]
    
    API -->|Read/Write State| DB[(PostgreSQL)]
    API -->|Write Time-Series| TS[(TimescaleDB)]
    API -->|Write/Cache Latest State| Redis[(Redis)]
    
    API -->|Push Updates| WS[WebSocket Server]
    WS -->|Live Telemetry| Client(React Dashboard)
    Client -->|REST API Calls| API
```

## Core Components
- **Vehicle Simulator**: A Python script generating mock vehicle data and sending it to MQTT.
- **MQTT Broker**: Eclipse Mosquitto handling scalable telemetry ingestion.
- **Node.js Fastify API**: The central backend service. It consumes MQTT messages, validates them, saves historical data to TimescaleDB, updates live state in Redis, and pushes events to WebSockets. It also handles CRUD operations backed by PostgreSQL.
- **React Dashboard**: The user interface connecting to the API for configuration/historical data, and WebSockets for real-time live map updates.
