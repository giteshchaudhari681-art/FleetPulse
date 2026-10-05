# Engineering Standards

## Naming
- **Files/Folders:** kebab-case for directories and standard files. PascalCase for React components and class exports.
- **Variables/Functions:** camelCase.
- **Constants/Environment:** UPPER_SNAKE_CASE.

## TypeScript
- Strict mode must be enabled.
- Avoid `any`. Use `unknown` if the type is truly not known, and narrow it.
- Export interfaces and types from dedicated files if shared across boundaries.

## API Design
- Follow RESTful conventions.
- Use plural nouns for resources (e.g., `/api/v1/vehicles`).
- Use standard HTTP status codes.
- Response payloads should be wrapped consistently (e.g., `{ data: ..., meta: ... }`).

## Validation
- All incoming HTTP requests and MQTT payloads must be validated using Zod schemas.
- Invalid data must be rejected before reaching domain logic.

## Error Handling
- Use a central error handler to catch exceptions.
- Never leak stack traces in production API responses.
- Differentiate between operational errors (e.g., Bad Request) and programmer errors (e.g., Null Reference).

## Logging
- Use Pino for structured JSON logging.
- Do not log sensitive PII or credentials.

## Testing
- **Unit tests:** For domain logic, utilities, and isolated components.
- **Integration tests:** For API endpoints, database queries, and MQTT ingestion.
- Tests must clean up after themselves.

## Environment Variables
- All environment variables must be documented in `.env.example`.
- Applications must validate the presence of required environment variables on startup.

## Git Workflow
- Commits should follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
- PRs must pass CI before merging.

## Security
- Use parameterized queries for all database interactions to prevent SQL injection.
- Validate all inputs.
- Use secure HTTP headers (Helmet).
