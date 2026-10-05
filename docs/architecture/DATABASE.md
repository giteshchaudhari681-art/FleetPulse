# Database Architecture

## Technology Choice
- **Database**: PostgreSQL (v15)
- **Database Client / ORM**: Prisma

Prisma is chosen as the foundational database access layer because it provides type safety, an easy-to-use API, and a robust migration system that will scale well with the complexity of FleetPulse.

## Configuration and Lifecycle
Database configuration is owned by `@fleetpulse/config/server`. The connection string (`DATABASE_URL`) is required during backend initialization.

### Startup Behavior
The database connection is actively verified before the Fastify server binds to its port. If PostgreSQL is unreachable, the startup fails explicitly to prevent silent system degradation.

### Readiness
The `/ready` endpoint executes a lightweight query (`SELECT 1`) to ensure the database remains available during the application's runtime. The `/health` endpoint remains a simple liveness check and does not rely on database availability.

### Shutdown
During graceful shutdown, the Prisma client's disconnect method is called to safely terminate connections.

## Schema Ownership and Migrations
Currently, the database schema contains only the foundational connection definitions. 
- **Ownership**: The schema is owned by the backend team and is located at `apps/api/prisma/schema.prisma`.
- **Migrations**: Future PRs will introduce domain entities (e.g., User, Fleet, Vehicle) and leverage Prisma's migration tooling (`npx prisma migrate dev` and `npx prisma db push`).
- **Local Development**: Developers use the provided `docker-compose.yml` to spin up a local PostgreSQL instance.

## Security
- No production credentials are to be stored in the codebase.
- `.env` files are correctly ignored by `.gitignore`.
- Database errors are sanitized before returning responses to the API consumers to avoid exposing internal infrastructure details.
