# Architecture

## Application layers

```text
Browser
  ├─ Localized Next.js App Router pages (server-rendered by default)
  ├─ Small client components for nav, gallery, filters, and submit state
  └─ Server Actions / route handlers
        ├─ Zod validation + auth checks
        ├─ Prisma data access
        └─ SQLite (development) / PostgreSQL (production migration target)
```

## Boundaries
- `lib/db.ts` is the sole Prisma client entry point.
- `lib/auth.ts` owns cookie/session validation; admin pages and actions call it independently.
- `lib/validations.ts` owns server-shared schemas.
- `lib/properties.ts` parses untrusted URL filters and builds bounded Prisma queries.
- Public pages select only published properties. Administrative data remains server-only.

## Locale contract
- Allowed locales are `ar` and `en`; Arabic is default and receives `dir="rtl"`.
- Copy comes from locale dictionaries. Property fields are selected through explicit localized helpers, rather than concatenated sentence fragments.
- Locale-preserving links replace only the first route segment.

## Query contract
- Property results are queried in the database with a fixed maximum page size.
- Price filters are allowed only when a country filter determines one currency. This prevents comparisons or sorts across EGP, SAR, and AED.
- Price sorting works only inside a single selected market; otherwise newest is enforced.

## Security contract
- All public/admin mutations parse a strict Zod payload and map explicit fields.
- Admin mutations call `requireAdmin` on the server.
- Login compares credentials with bcrypt and signs a short-lived JWT into an HttpOnly cookie.
- Public inquiries include a honeypot and reject oversized/malformed input.

## Operational contract
- `npm run db:push` syncs the local schema, and `npm run db:seed` upserts demonstration data.
- `.env.example` documents all required variables, with no secret values.
- Production deploys must change Prisma to PostgreSQL, set `AUTH_SECRET`, configure HTTPS, and use a durable database.