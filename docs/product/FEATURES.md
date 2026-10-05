# Features

## Authentication
- **Planned:** JWT-based access and refresh tokens, RBAC & Permissions, secure login/logout.
- **Future:** SSO integration.
- **Out of Scope:** Social logins (e.g., Google/Facebook).

## Fleet Management
- **Planned:** Create, update, list, and delete fleets. Organization grouping.
- **Out of Scope:** Multi-tenant billing.

## Vehicle Management
- **Planned:** Vehicle registry, metadata grouping.
- **Out of Scope:** Vehicle procurement workflows.

## Driver Management
- **Planned:** Driver registry, vehicle-driver assignments.
- **Out of Scope:** Payroll tracking.

## Telemetry
- **Planned:** GPS telemetry ingestion, vehicle sensor telemetry (speed, fuel, temp), normalization, validation.
- **Future:** CAN bus raw data ingestion.
- **Out of Scope:** Custom hardware protocol integration.

## Realtime Tracking
- **Planned:** Live vehicle state over WebSockets, live speed/sensor updates, reconnection resilience.
- **Out of Scope:** Push notifications to driver apps.

## Maps
- **Planned:** Real-time fleet map, vehicle clustering.
- **Out of Scope:** Custom proprietary map rendering engine.

## Trips
- **Planned:** Trip creation, assignment, lifecycle, history, route visualization.
- **Out of Scope:** Dispatch/booking optimization algorithms.

## Analytics
- **Planned:** Speed analytics, fuel analytics, temperature analytics, distance and utilization metrics, historical telemetry queries.
- **Out of Scope:** Financial/tax reporting.

## Alerts
- **Planned:** Alert rule engine, overspeed, low-fuel, temperature, vehicle offline, geofence alerts, alert lifecycle/resolution.
- **Out of Scope:** Automated robotic response.

## Geofencing
- **Planned:** Geofence management (polygons, circles), entry/exit event detection, proximity detection.
- **Out of Scope:** Real-time dynamic traffic-based geofences.

## Maintenance
- **Planned:** Maintenance records, scheduling, service history, due detection, maintenance alerts.
- **Out of Scope:** Mechanics' workflow app.

## Audit
- **Planned:** Vehicle and fleet audit history, user activity history.
- **Out of Scope:** Legal compliance archiving.

## Observability
- **Planned:** Application metrics, distributed tracing, structured logging.
- **Out of Scope:** Log archival storage.
