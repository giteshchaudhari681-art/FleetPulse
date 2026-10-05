# ADR 003: React and Vite Frontend

## Status
Accepted

## Context
We need a dynamic, real-time dashboard capable of rendering live maps and updating charts at high frequencies.

## Decision
We will use React packaged via Vite.

## Alternatives Considered
- Create React App: Deprecated and slow.
- Next.js: Great for SSR and SEO, but FleetPulse is a heavy authenticated dashboard that doesn't benefit much from SSR. The added complexity of SSR for real-time map rendering outweighs the benefits.

## Consequences
- Extremely fast development iteration loops due to Vite's HMR.
- Client-side rendering is sufficient for this authenticated SaaS platform.
