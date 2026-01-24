# Platform foundation plan

This document outlines the recommended architecture for adding auth, database, roles, and audit trails without locking in a vendor yet.

## Auth
- Option A: NextAuth (Auth.js) with credentials + OAuth providers (Google, GitHub).
- Option B: Custom JWT with refresh tokens and rotating secrets.
- Use httpOnly cookies for session storage.
- Store session data in the database with TTL.

## Database
- Postgres as the primary database.
- Prisma for schema migrations and type-safe access.
- Separate schema for analytics/audit tables.

## Roles
- Roles: admin, client.
- Role -> permissions mapping table (many-to-many).
- Enforce role checks at API route layer.

## Audit
- Central audit log table: actor, action, resource, metadata, timestamp.
- Capture requestId and source IP for traceability.
- Implement retention policy (90-180 days) and archiving.

## Notes
- Keep secrets in env vars or secret manager.
- Add background jobs for email/webhook delivery later.
