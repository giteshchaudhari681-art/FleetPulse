# ADR 001: Monorepo Structure

## Status
Accepted

## Context
FleetPulse will have multiple moving parts: a frontend React app, a Node.js API, a Python simulator, and shared configurations/validations. Managing these as completely separate repositories creates overhead in coordinating changes across boundaries.

## Decision
We will use a single monorepo structure.

## Alternatives Considered
- Polyrepo: Separate repos for frontend, API, simulator. High friction for full-stack features.

## Consequences
- Easier to share types (e.g. DTOs and Zod schemas) between frontend and backend.
- Simplified CI setup for end-to-end integration tests.
- Requires tooling like Turborepo or simple npm workspaces to manage dependencies effectively.
