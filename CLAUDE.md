# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js with Turbo)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
npm run test         # Run all tests once (Vitest)
npm run test:watch   # Vitest in watch mode
npm run db:generate  # Generate Drizzle migration files
npm run db:migrate   # Apply migrations to Neon DB
npm run db:studio    # Open Drizzle Studio
```

To run a single test file: `npx vitest run src/test/filterData.test.ts`

## Architecture

**Shelterium AI** is a UAE real estate platform (Dubai & Abu Dhabi) built on Next.js 14 App Router. Properties originate from the Bayut API and are stored in a Neon (serverless) PostgreSQL database via Drizzle ORM.

### Data pipeline

1. **Sync** (`/api/sync`): A GET endpoint (guarded by `SYNC_SECRET`) fetches `for-sale` and `for-rent` listings from the Bayut RapidAPI and upserts them into the `properties` table using `externalId` as the conflict key.
2. **Serve** (`/api/properties`, `/api/properties/[id]`): Query the local Neon DB with Drizzle — no live Bayut calls on user requests. DB rows are mapped to typed responses via `src/lib/db/mappers.ts` (`toListItem` / `toDetail`).
3. **AI Search** (`/api/ai/search`): Accepts a natural-language query, sends it to Google Gemini (`gemini-3-flash-preview`), returns structured `PropertyListParams` JSON. Validated with Zod before returning.
4. **AI Price** (`/api/ai/price`): Given a property's attributes, fetches comparable listings from the DB, computes a percentile, then asks Gemini for a market-position narrative.

### Client data flow

Pages (`/buy`, `/rent`) fetch initial SSR data via `utils/dataFetch` and pass it to `PropertyBrowser` as `initialProperties`. On first render, SSR data is shown. Once the user filters (via `FilterBar` or `NLSearchBar`), `PropertyBrowser` switches to a TanStack Query `useProperties` hook that hits `/api/properties` client-side.

```
SSR page → initialProperties → PropertyBrowser
                                  ├─ NLSearchBar → POST /api/ai/search → filter params
                                  ├─ FilterBar → filter params
                                  └─ useProperties (TanStack Query) → GET /api/properties
```

### Key directories

| Path | Purpose |
|------|---------|
| `src/app/api/` | Next.js Route Handlers (properties CRUD + AI endpoints) |
| `src/lib/db/` | Drizzle schema, DB client, row→type mappers |
| `src/features/properties/hooks/` | TanStack Query hooks (`useProperties`, `usePropertyDetail`) |
| `src/components/ui/` | Shared UI primitives + `PropertyBrowser`, `PropertyCard`, `FilterBar`, `PropertyGrid` |
| `src/components/ai/` | `NLSearchBar`, `PriceIntelCard` |
| `src/types/property.ts` | Canonical TypeScript types (`PropertyListItem`, `PropertyDetail`, `PropertyListParams`) |
| `utils/` | Root-level legacy fetch utilities (`dataFetch`, `filterData`) used by SSR pages |

### Path aliases

Defined in both `tsconfig.json` and `vitest.config.ts`:
- `@/` → `src/`
- `utils` → `./utils` (root, not `src/utils`)
- `assets` → `./assets`

### Environment variables

Required in `.env`:
```
DATABASE_URL=       # Neon PostgreSQL connection string
RAPID_API_KEY=      # Bayut via RapidAPI (only used by /api/sync)
SYNC_SECRET=        # Arbitrary secret to protect /api/sync
GEMINI_API_KEY=     # Google AI Studio key for Gemini models
```

### Type mapping

The DB schema uses snake_case (`external_id`, `cover_photo`). `src/lib/db/mappers.ts` converts to camelCase TypeScript types. The `PropertyRow` type is inferred from Drizzle's `$inferSelect`. JSONB columns (`coverPhoto`, `agency`, `amenities`, `photos`, `location`, `phoneNumber`, `category`) are stored as `jsonb` and cast to their TypeScript types in the mappers.

### Testing

Tests live in `src/test/` and use Vitest + jsdom. `dataFetch.test.ts` mocks `axios`; `filterData.test.ts` tests pure filter utilities. MSW is available but not yet wired into a handler file.
