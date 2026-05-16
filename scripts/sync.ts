import { config } from "node:process";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { properties } from "../src/lib/db/schema";

// Load env manually since tsx doesn't auto-load .env
import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const raw = readFileSync(".env", "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

loadEnv();

const BYUT_BASE = "https://byut-api.p.rapidapi.com";
const PURPOSES = ["for-sale", "for-rent"] as const;

async function fetchPage(purpose: string, apiKey: string) {
  const params = new URLSearchParams({
    location_external_id: "5002",
    purpose,
    hitsPerPage: "25",
    page: "0",
    category: "residential",
  });
  const res = await fetch(`${BYUT_BASE}/search/property?${params}`, {
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "byut-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Byut ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.datan?.hits ?? data.hits ?? [];
}

async function main() {
  const apiKey = process.env.RAPID_API_KEY;
  const dbUrl  = process.env.DATABASE_URL;
  if (!apiKey) throw new Error("RAPID_API_KEY not set");
  if (!dbUrl)  throw new Error("DATABASE_URL not set");

  const sql = neon(dbUrl);
  const db  = drizzle(sql, { schema: { properties } });

  let synced = 0;

  for (const purpose of PURPOSES) {
    console.log(`Fetching ${purpose}...`);
    const hits = await fetchPage(purpose, apiKey);
    console.log(`  Got ${hits.length} results`);

    for (const h of hits) {
      await db
        .insert(properties)
        .values({
          externalId:       String(h.externalID),
          title:            h.title ?? null,
          price:            h.price ?? null,
          rentFrequency:    h.rentFrequency ?? null,
          rooms:            h.rooms ?? null,
          baths:            h.baths ?? null,
          area:             h.area ?? null,
          isVerified:       h.isVerified ?? false,
          coverPhoto:       h.coverPhoto ?? null,
          agency:           h.agency ?? null,
          purpose:          h.purpose ?? purpose,
          category:         h.category ?? [],
          location:         h.location ?? null,
          description:      h.description ?? null,
          completionStatus: h.completionStatus ?? null,
          referenceNumber:  h.referenceNumber ?? null,
          contactName:      h.contactName ?? null,
          phoneNumber:      h.phoneNumber ?? null,
          state:            h.state ?? null,
          product:          h.product ?? null,
          type:             h.type ?? null,
          furnishingStatus: h.furnishingStatus ?? null,
          amenities:        h.amenities ?? null,
          photos:           h.photos ?? null,
        })
        .onConflictDoUpdate({
          target: properties.externalId,
          set: {
            title:      h.title ?? null,
            price:      h.price ?? null,
            isVerified: h.isVerified ?? false,
            coverPhoto: h.coverPhoto ?? null,
            rooms:      h.rooms ?? null,
            baths:      h.baths ?? null,
            area:       h.area ?? null,
            purpose:    h.purpose ?? purpose,
          },
        });
      synced++;
    }
    console.log(`  Upserted ${hits.length} rows for ${purpose}`);
  }

  console.log(`\nDone — ${synced} total rows synced.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
