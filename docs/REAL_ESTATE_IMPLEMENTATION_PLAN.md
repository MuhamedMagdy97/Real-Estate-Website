# Madar Real Estate — Implementation Plan

## Repository audit
- The workspace contained only `IDEA.md`; no existing app, package manager, database, repository instructions, or Git repository was present.
- Node.js 24.11.1 and npm 11.6.2 are available. OpenCode is not installed, so implementation proceeds directly in the workspace.

## Confirmed decisions
- **App:** Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide icons.
- **Data:** Prisma with SQLite for a reproducible local portfolio demo. The schema remains compatible with PostgreSQL migration for production.
- **Auth:** Credentials-based administrator authentication using signed JWT cookies and `bcryptjs`; only documented environment-configured credentials may create a session.
- **Localization:** `/ar` (default) and `/en` locale segments; server dictionaries, locale validation, `dir`/`lang` at layout level, and locale-preserving links.
- **Forms:** Server Actions validate with Zod. A hidden honeypot plus a minimum submit interval provide basic anti-spam protection.

## Product requirements
1. Premium bilingual public property discovery experience with genuine database queries.
2. Published listings have localized cards, filters, sorting, pagination, details, metadata, and inquiry workflow.
3. At least ten fictional, clearly demo-oriented Arabic/English listings across Egypt and Gulf markets using native EGP/SAR/AED values.
4. Server-protected admin login, dashboard, listing management, and inquiry status management.
5. Responsive, accessible UI; SEO metadata, sitemap, robots, and localized not-found states.

## Architecture
- `app/[locale]`: public localized routes; Server Components query data server-side.
- `app/admin`: protected administrative routes and actions.
- `lib`: database, auth, validation, localization, configuration, property query parsing.
- `components`: layout, property, form, and admin presentation components.
- `prisma`: schema and idempotent seed script.
- `tests`: Vitest unit tests for filter/query parsing and validation.

## Data model
- `Property`: bilingual content, country/city/area, listing and property type enums, native price/currency, attributes, status, featured flag, image URL array, localized amenity arrays, timestamps; indexed public discovery fields.
- `Inquiry`: optional property relation, contact details, contact preference, message, state and timestamps.
- No public endpoint returns inquiry data. Admin identity is environment-configured rather than persisted to avoid shipping default credentials.

## Route map
- Public: `/ar`, `/en`, `/[locale]/properties`, `/[locale]/properties/[slug]`, `/[locale]/about`, `/[locale]/contact`.
- Admin: `/admin/login`, `/admin`, `/admin/properties`, `/admin/properties/new`, `/admin/properties/[id]/edit`, `/admin/inquiries`.

## Security
- Zod validation and explicit payload mapping for every mutation.
- DB access only in server modules; JWT cookie is HttpOnly, SameSite=Lax, Secure in production.
- Admin route guard and repeated server-action authorization.
- Password comparison uses bcrypt; no password is stored in source or the database.
- Safe URL checks for image links and WhatsApp generation; generic public errors; no uncontrolled mass assignment.

## Testing and verification
1. Test-first Vitest tests for filter parameter normalization, currency scoping, and inquiry schema.
2. Prisma generation, database push/migration equivalent, and idempotent seed execution.
3. ESLint, type check, unit tests, and production build.
4. Browser smoke testing: locale switch, search/filter, detail and form flow, not-found, protected admin route, login, admin mutation.

## Sequential work
1. Scaffold Next app, baseline configuration, locales, and documentation.
2. Add Prisma schema, seed data and tested domain logic.
3. Build shared design primitives and public pages.
4. Build filtered listing, details, inquiry persistence.
5. Add authentication and protected admin CRUD/status workflows.
6. Add metadata, sitemap/robots, accessibility/responsive refinement, and full QA.

## Risks and limitations
- SQLite is intended only for local development/demo. Production should switch `DATABASE_URL` and Prisma provider to PostgreSQL and run a migration.
- Image URLs use stable Unsplash Source URLs only as illustrative remote imagery; no license claim is made. A production client must provide licensed asset management.
- There is no email/SMS/WhatsApp sending integration; forms persist leads and WhatsApp opens a configured link only.
- Rate limiting, HTTPS headers, and secret rotation require deployment-level configuration.