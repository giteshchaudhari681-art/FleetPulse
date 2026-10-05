# ADR 008: Python for Vehicle Simulation

## Status
Accepted

## Context
We need to generate high volumes of realistic GPS and sensor telemetry to simulate a large fleet of vehicles without needing physical hardware during development.

## Decision
We will use Python to build the vehicle simulator.

## Alternatives Considered
- Node.js: Works, but Python has superior libraries for geospatial calculations, data science generation, and mathematical simulations.
- Go/Rust: Performant, but overkill for a development simulator where rapid iteration on logic is more important than raw performance.

## Consequences
- Simulator development is isolated from the main TypeScript codebase.
- Python ecosystem provides tools like Shapely and NumPy for realistic route generation.
