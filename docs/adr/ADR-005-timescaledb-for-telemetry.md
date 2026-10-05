# ADR 005: TimescaleDB for Telemetry

## Status
Accepted

## Context
Telemetry data is fundamentally time-series data. Over time, the volume of this data will grow immensely. We need an efficient way to query and store this data.

## Decision
We will use TimescaleDB (a PostgreSQL extension) to store historical telemetry.

## Alternatives Considered
- InfluxDB: Good, but adopting it introduces a completely separate database paradigm and query language.
- MongoDB: Lacks native time-series optimization in the way TimescaleDB provides for relational structures.

## Consequences
- We can use standard SQL to query both our relational domain data and our time-series telemetry data.
- Simplified operational overhead since it's essentially PostgreSQL.
