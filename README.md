<div align="center">

# Shelterium

### AI-Powered Real Estate Discovery for the UAE

**Find your next home in Dubai or Abu Dhabi — powered by natural language search and market intelligence.**

[![CI](https://github.com/Engraya/Shelterium/actions/workflows/ci.yml/badge.svg)](https://github.com/Engraya/Shelterium/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## Overview

Shelterium is a production-grade real estate search platform built for the UAE market. It aggregates verified property listings from Bayut across Dubai and Abu Dhabi and layers intelligent AI capabilities on top — letting users describe what they want in plain English and instantly understand how a property's price compares to the broader market.

The platform is built for buyers, renters, and property seekers who want a modern, fast, and intelligent alternative to generic listing portals. Instead of clicking through dozens of filter dropdowns, users simply type: *"2-bedroom furnished apartment in Dubai Marina under 120k/year"* — and Shelterium handles the rest.

**Core problems it solves:**

- Property search UIs are complex and form-heavy — Shelterium replaces them with natural language
- Buyers have no easy way to gauge whether a listed price is fair — the AI Price Intelligence feature solves this with real comparable data
- UAE listing data is scattered — Shelterium aggregates, normalizes, and stores Bayut data in a queryable PostgreSQL database

---

## Features

### AI-Powered Search
- **Natural Language Queries** — Ask for properties in plain English; Google Gemini parses the intent and extracts structured filters (price range, bedrooms, type, furnishing, rent frequency)
- **Interpreted Queries** — The UI shows a human-readable summary of how the query was understood, giving users confidence in their results
- **Smart Category Mapping** — Gemini maps property types (apartment, villa, townhouse, penthouse, hotel apartment) to Bayut's canonical category IDs

### AI Price Intelligence
- **Market Comparables Engine** — For any property, the system automatically pulls comparable listings (same area, similar size and bedroom count) from the database
- **Percentile Ranking** — Calculates where a listing's price sits relative to the market (below, at, or above market)
- **AI Narratives** — Gemini generates a plain-English explanation of the price verdict (e.g. *"This villa is priced 18% below the median for similar units in Jumeirah..."*)
- **Market Summary** — Shows average, minimum, and maximum comparable prices alongside the verdict

### Property Browsing
- **Buy & Rent Modes** — Separate browsing flows for purchase and rental properties
- **Advanced Filters** — Price range, bedrooms, bathrooms, area (sqft), property type, furnishing status, rent frequency, sort order
- **Grid & List Views** — Responsive property card layout optimized for desktop and mobile
- **Active Filter Chips** — Visual summary of applied filters with one-click removal
- **Property Detail Pages** — Full-screen hero image, photo gallery, specifications, amenities, agency info, and contact panel
- **Verified Listings** — Bayut-verified badge displayed on confirmed properties

### Developer Experience
- **Full TypeScript** — End-to-end type safety from database schema to UI components
- **Drizzle ORM** — Type-safe SQL queries with zero runtime overhead
- **TanStack Query v5** — Declarative server state with stale-while-revalidate caching
- **Vitest + MSW** — Fast unit tests with mock service workers for API simulation
- **GitHub Actions CI** — Lint, type-check, test, and build on every push and PR
- **Drizzle Studio** — Visual database browser included in dev tooling

### Performance
- **Server-Side Rendering** — Listing pages are SSR'd at request time for SEO and perceived performance
- **Optimized Image Pipeline** — Next.js Image with WebP conversion, lazy loading, and remote CDN pattern allowlisting
- **Query Caching** — TanStack Query with 60s stale time and 5-minute garbage collection
- **Database Indexes** — Indexed on `purpose` and `price` columns for fast filtered queries

### UI & Accessibility
- **Dark / Light Mode** — System preference detection via `next-themes` with CSS variable theming
- **shadcn/ui Components** — Accessible, unstyled-first component primitives
- **Fully Responsive** — Mobile-first Tailwind CSS layout that works on all screen sizes
- **Security Headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` on all routes

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5.3](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/), OKLch CSS variables |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [@base-ui/react](https://base-ui.com/), [Lucide React](https://lucide.dev/) |
| **Database** | [Neon PostgreSQL](https://neon.tech/) (serverless, HTTP driver) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) + Drizzle Kit (migrations) |
| **AI** | [Google Gemini](https://ai.google.dev/) (`gemini-3-flash-preview`) |
| **State Management** | [TanStack Query v5](https://tanstack.com/query) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Data Source** | [Bayut RapidAPI](https://rapidapi.com/apidojo/api/bayut) |
| **Testing** | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), [MSW](https://mswjs.io/) |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Linting** | ESLint (Next.js config), Prettier, `prettier-plugin-tailwindcss` |
| **HTTP Client** | [Axios](https://axios-http.com/) |

---

## Architecture

### Project Structure

```
shelterium/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions: lint → test → build
│
├── drizzle/
│   ├── 0000_aspiring_ben_urich.sql   # Initial database migration
│   └── meta/                         # Drizzle migration metadata
│
├── public/
│   └── images/                       # Static assets (hero, logo, testimonials)
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   ├── search/route.ts   # POST: NL query → structured filters (Gemini)
│   │   │   │   └── price/route.ts    # POST: property ID → price intelligence (Gemini)
│   │   │   ├── properties/
│   │   │   │   ├── route.ts          # GET: filtered property list (from DB)
│   │   │   │   └── [id]/route.ts     # GET: single property detail
│   │   │   └── sync/route.ts         # GET: Bayut API → Neon DB sync (secret-protected)
│   │   │
│   │   ├── buy/
│   │   │   ├── page.tsx              # SSR property listing (for-sale)
│   │   │   └── [id]/page.tsx         # Property detail (for-sale)
│   │   ├── rent/
│   │   │   ├── page.tsx              # SSR property listing (for-rent)
│   │   │   └── [id]/page.tsx         # Property detail (for-rent)
│   │   │
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── page.tsx                  # Landing / home page
│   │   └── providers.tsx             # TanStack Query + next-themes providers
│   │
│   ├── components/
│   │   ├── ai/
│   │   │   ├── NLSearchBar.tsx       # Natural language search input (Gemini-backed)
│   │   │   └── PriceIntelCard.tsx    # AI price analysis display card
│   │   ├── ui/
│   │   │   ├── PropertyBrowser.tsx   # Main browsing orchestrator component
│   │   │   ├── PropertyCard.tsx      # Reusable property card (grid + list variants)
│   │   │   ├── PropertyGrid.tsx      # Responsive grid layout with skeleton states
│   │   │   ├── FilterBar.tsx         # Desktop + mobile filter UI
│   │   │   └── SearchDropdown.tsx    # Accessible custom dropdown
│   │   ├── Header/                   # Navigation with dark mode toggle
│   │   ├── Hero/                     # Landing page hero section
│   │   ├── Features/                 # Feature cards section
│   │   ├── About/                    # About sections
│   │   ├── Testimonials/             # Reviews carousel (Swiper)
│   │   └── Footer/
│   │
│   ├── features/
│   │   └── properties/hooks/
│   │       ├── useProperties.ts      # TanStack Query hook: property list
│   │       └── usePropertyDetail.ts  # TanStack Query hook: single property
│   │
│   ├── lib/
│   │   ├── ai/client.ts              # Google Generative AI singleton
│   │   ├── db/
│   │   │   ├── index.ts              # Drizzle + Neon connection
│   │   │   ├── schema.ts             # Database table definitions
│   │   │   └── mappers.ts            # DB row → TypeScript type mappers
│   │   └── cn.ts                     # Tailwind class merger utility
│   │
│   ├── styles/index.css              # Tailwind directives + OKLch theme tokens
│   ├── test/                         # Vitest unit tests
│   └── types/                        # Shared TypeScript types
│
├── utils/
│   ├── dataFetch.ts                  # Bayut API fetching (server-side)
│   └── filterData.ts                 # Filter option definitions
│
├── drizzle.config.ts                 # Drizzle Kit configuration
├── next.config.js                    # Next.js config (image CDN, security headers)
├── tailwind.config.js                # Tailwind theme extensions
├── vitest.config.ts                  # Test runner configuration
└── components.json                   # shadcn/ui configuration
```

### Data Flow

```
User Input (NL query)
      │
      ▼
NLSearchBar → POST /api/ai/search → Gemini Flash → Structured Filters
      │
      ▼
PropertyBrowser → TanStack Query → GET /api/properties → Drizzle ORM → Neon PostgreSQL
      │
      ▼
PropertyGrid → PropertyCard → Property Detail Page
      │
      ▼
PriceIntelCard → POST /api/ai/price → DB Comparables → Gemini Flash → Price Verdict
```

### Data Sync Pipeline

```
Manual trigger: GET /api/sync?secret=<SYNC_SECRET>
      │
      ▼
Bayut RapidAPI → Fetch 30 × for-sale + 30 × for-rent
      │
      ▼
Drizzle ORM → UPSERT by externalId → Neon PostgreSQL
```

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- A [Neon](https://neon.tech/) PostgreSQL database
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- A [RapidAPI](https://rapidapi.com/) account with access to the [Bayut API](https://rapidapi.com/apidojo/api/bayut)

### Installation

```bash
# Clone the repository
git clone https://github.com/Engraya/Shelterium.git
cd Shelterium

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
# ─── AI ────────────────────────────────────────────────────────────────────────
# Google Gemini API key — get one at https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# ─── Property Data ─────────────────────────────────────────────────────────────
# RapidAPI key with access to the Bayut API
# https://rapidapi.com/apidojo/api/bayut
RAPID_API_KEY=your_rapidapi_key_here

# ─── Database ──────────────────────────────────────────────────────────────────
# Neon PostgreSQL connection string (pooler endpoint recommended)
# Format: postgresql://user:password@host:port/dbname?sslmode=require
DATABASE_URL=postgresql://user:password@host.neon.tech/shelterium?sslmode=require

# ─── Security ──────────────────────────────────────────────────────────────────
# Secret key to protect the /api/sync data sync endpoint
# Generate one: openssl rand -hex 32
SYNC_SECRET=your_random_secret_string_here
```

### Database Setup

```bash
# Generate the initial migration (if schema changed)
npm run db:generate

# Apply migrations to your Neon database
npm run db:migrate

# (Optional) Launch Drizzle Studio to browse your database
npm run db:studio
```

### Seed Data

Populate the database with live property listings from Bayut:

```bash
curl "http://localhost:3000/api/sync?secret=your_sync_secret"
```

This fetches 30 for-sale and 30 for-rent properties and upserts them into the `properties` table.

### Run Locally

```bash
# Start the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check (no emit) |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:studio` | Launch Drizzle Studio (database browser) |

---

## API Reference

All endpoints return JSON. No authentication is required unless noted.

### `POST /api/ai/search`

Parse a natural language property search query into structured filters.

**Request body:**
```json
{ "query": "2-bedroom furnished apartment in Dubai under 120k per year" }
```

**Response:**
```json
{
  "roomsMin": 2,
  "furnishingStatus": "furnished",
  "maxPrice": 120000,
  "rentFrequency": "yearly",
  "categoryExternalID": 4
}
```

All fields are optional — only those that can be inferred from the query are included.

---

### `POST /api/ai/price`

Analyze a property's price against comparable listings in the database.

**Request body:**
```json
{
  "externalId": "123456",
  "price": 950000,
  "rooms": 2,
  "area": 1100,
  "state": "Dubai Marina",
  "purpose": "for-sale"
}
```

**Response:**
```json
{
  "verdict": "below_market",
  "narrative": "This 2-bedroom apartment is priced 14% below the median for similar units in Dubai Marina...",
  "avgPrice": 1105000,
  "minPrice": 820000,
  "maxPrice": 1450000,
  "comparableCount": 7,
  "percentile": 22
}
```

Verdicts: `"below_market"` | `"at_market"` | `"above_market"`

---

### `GET /api/properties`

Fetch a filtered list of properties from the database.

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `purpose` | `"for-sale"` \| `"for-rent"` | **Required** |
| `minPrice` | number | Minimum price in AED |
| `maxPrice` | number | Maximum price in AED |
| `roomsMin` | number | Minimum bedroom count |
| `bathsMin` | number | Minimum bathroom count |
| `areaMax` | number | Maximum area in sqft |
| `furnishingStatus` | `"furnished"` \| `"unfurnished"` | Furnishing filter |
| `rentFrequency` | `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` | Rent period |
| `categoryExternalID` | number | Property type (4=Apt, 3=Villa, 16=Townhouse, 18=Penthouse, 21=Hotel Apt) |
| `sort` | string | `price-asc`, `price-desc`, `verified-score`, `city-level-score` |

Returns up to 30 properties.

---

### `GET /api/properties/[id]`

Fetch full details for a single property by its internal database ID.

---

### `GET /api/sync?secret=<SYNC_SECRET>`

Trigger a Bayut API → database sync. Fetches the latest 30 properties per purpose and upserts them.

**Auth:** Query parameter `secret` must match `SYNC_SECRET` environment variable.

**Response:**
```json
{ "synced": 60 }
```

---

## AI Integration

Shelterium uses **Google Gemini Flash** (`gemini-3-flash-preview`) for two distinct AI workflows.

### Natural Language Search

When a user types a freeform query, the `/api/ai/search` route sends it to Gemini with a structured system prompt that instructs the model to extract property filter intent. The model outputs strict JSON (validated with Zod), which is then used to query the database. Unparseable queries are gracefully handled with user-facing error messages.

**Example transformation:**

> *"3-bed villa in Abu Dhabi for sale, max 3 million"*

```json
{
  "roomsMin": 3,
  "categoryExternalID": 3,
  "maxPrice": 3000000
}
```

### Price Intelligence

On each property detail page, the price intelligence workflow runs automatically:

1. The property's `externalId`, `price`, `rooms`, `area`, `state`, and `purpose` are sent to `/api/ai/price`
2. The server queries the database for comparable properties: same purpose and area, ±1 bedroom, ±30% area
3. The property's price is ranked against comparables to compute a percentile score
4. The percentile determines a market verdict:
   - **Below market** — priced lower than the 35th percentile
   - **At market** — 35th to 65th percentile
   - **Above market** — above the 65th percentile
5. Gemini generates a concise narrative explaining the verdict in plain English

---

## Performance

### Rendering Strategy

- **Server-Side Rendering (SSR)** — `/buy` and `/rent` listing pages are fully rendered on the server at request time, improving both SEO and perceived load speed
- **Client-Side Fetching** — Filter interactions use TanStack Query to fetch from `/api/properties` without a full page reload
- **Stale-While-Revalidate** — Cached responses stay fresh for 60 seconds; garbage collection at 5 minutes

### Image Optimization

- All property images pass through Next.js Image Optimization, which converts to WebP, resizes for the viewport, and lazy-loads below-the-fold images
- Remote image patterns are explicitly allowlisted in `next.config.js` (Bayut S3 and CDN domains)

### Database

- Indexes on `purpose` and `price` columns for fast filtered queries
- Upserts use PostgreSQL `ON CONFLICT DO UPDATE` for idempotent syncs
- Neon serverless driver uses HTTP connections — no persistent connection pool required

### Bundle

- Tree-shakeable icon library (Lucide React) — only imported icons are bundled
- Automatic route-level code splitting via the App Router
- Tailwind CSS compiled to a single, purged stylesheet at build time

---

## Deployment

### Vercel (Recommended)

1. Fork or push the repository to GitHub
2. Create a new Vercel project and import the repository
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy — Vercel automatically runs `npm run build` and deploys to the edge

The API routes run as serverless functions; no additional server configuration is needed.

### Manual / Self-Hosted

```bash
npm run build
npm start
```

Set `PORT` to change the default port (3000). Ensure all environment variables are available in the shell environment.

### CI/CD

GitHub Actions runs three jobs in sequence on every push and pull request to `main`:

```
Lint & Type Check → Unit Tests → Production Build
```

All three jobs must pass before a PR can be merged. The build job is the final gate — it confirms the app compiles cleanly with the current dependency tree.

---

## Screenshots

> Replace these placeholders with actual screenshots.

**Landing Page**
![Landing page](./public/images/screenshots/landing.png)

**Property Listing (Buy)**
![Buy listing](./public/images/screenshots/buy-listing.png)

**Natural Language Search**
![AI Search](./public/images/screenshots/nl-search.png)

**Property Detail with Price Intelligence**
![Property detail](./public/images/screenshots/property-detail.png)

**Mobile View**
![Mobile](./public/images/screenshots/mobile.png)

**Dark Mode**
![Dark mode](./public/images/screenshots/dark-mode.png)

---

## Developer Notes

### Architecture Decisions

**App Router over Pages Router** — The project uses Next.js 14 App Router throughout, enabling React Server Components, Suspense streaming, and file-system-based layouts without manual `getServerSideProps` wiring.

**Drizzle over Prisma** — Drizzle was chosen for its zero-overhead query builder and first-class TypeScript inference. Queries are plain SQL under the hood with no runtime magic, and the schema is the single source of truth for types.

**Neon PostgreSQL** — The serverless driver communicates over HTTP, making it compatible with Vercel's edge runtime and eliminating cold-start connection pool issues common in Lambda environments.

**TanStack Query for client state** — Rather than maintaining a global Redux/Zustand store for property data, TanStack Query treats the API as the source of truth with smart caching. This reduces client-side complexity and keeps the data model flat.

**Gemini Flash for AI** — `gemini-3-flash-preview` is used over larger models deliberately — latency matters in a search context. Both AI endpoints are expected to respond in under 1 second.

### Coding Conventions

- All components are typed with explicit prop interfaces — no implicit `any`
- Database types are derived from the Drizzle schema, not defined separately
- Zod schemas are used at API boundaries to validate both inputs and Gemini outputs
- The `cn()` utility (`clsx` + `tailwind-merge`) is used for all className composition

---

## Roadmap

The following improvements are planned or under consideration:

- **User Accounts** — Saved searches, favorite listings, and property alerts via email/SMS
- **Map View** — Interactive property map using Mapbox or Google Maps
- **Webhook-Based Sync** — Replace manual `/api/sync` trigger with a scheduled Vercel Cron Job
- **Advanced AI Search** — Support for conversational multi-turn search (e.g., "show me something similar but cheaper")
- **Agent Dashboard** — A private portal for agencies to manage their listings
- **Listing Comparison** — Side-by-side comparison of up to 3 properties
- **Redis Caching** — Cache frequently filtered result sets to reduce database load
- **Mortgage Calculator** — Embedded calculator using UAE bank rates

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes and ensure all checks pass:
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```
4. Commit with a descriptive message following [Conventional Commits](https://www.conventionalcommits.org/)
5. Open a pull request against `main` with a clear description of the change

Please keep PRs focused on a single concern. Large, unfocused PRs will be asked to be split.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Built with Next.js, Drizzle ORM, and Google Gemini AI.

</div>
