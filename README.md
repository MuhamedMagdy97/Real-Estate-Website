# Madar Properties

A bilingual, database-backed portfolio demonstration for a premium real-estate discovery experience across Egypt and the Gulf. Listings are fictional demonstration data, not verified commercial inventory.

## Stack
- Next.js App Router + React + strict TypeScript
- Tailwind CSS v4 and Lucide icons
- Prisma + SQLite for local development (PostgreSQL-compatible model design for production)
- Zod server-side validation; signed JWT admin cookie using `jose`
- Vitest for domain validation tests

## Requirements
Node.js 20+ and npm.

## Install and run
```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```
Open http://localhost:3000 (redirects to Arabic) or `/en`.

## Environment
Copy `.env.example`. Required for database access: `DATABASE_URL`. Required for admin: set long random `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. No default production password is provided. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` are optional.

## Database
```bash
npm run db:push       # synchronize local SQLite schema
npm run db:seed       # idempotently upsert 11 demo properties
```
For production, use PostgreSQL, update the Prisma datasource provider/URL, run a checked migration, and use a managed backup plan.

## Quality commands
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Admin
Visit `/admin/login`. The server checks the email/password against environment variables, then writes an HttpOnly, SameSite session cookie. `/admin`, property status changes, and inquiry status changes all re-check authorization on the server.

## Scope notes
- Public inquiry forms persist to the local database; email, SMS, and WhatsApp delivery are not configured.
- Image URLs are illustrative Unsplash-hosted imagery. Production deployments require licensed asset management.
- The current admin area supports dashboard counts, publication/archival status updates, and inquiry workflow management. Full property creation/edit forms remain a next enhancement.
- Deployment should add HTTPS, database backups, rate limiting/WAF, security headers, and secret rotation.

See `docs/` for the implementation plan, architecture, tasks, and verification progress.