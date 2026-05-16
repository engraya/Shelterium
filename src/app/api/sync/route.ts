import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";

const BYUT_BASE = "https://byut-api.p.rapidapi.com";
const PURPOSES = ["for-sale", "for-rent"] as const;

async function fetchPage(purpose: string, apiKey: string) {
  const params = new URLSearchParams({
    location_external_id: "5002",
    purpose,
    hitsPerPage: "30",
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
  if (!res.ok) throw new Error(`Byut API responded with ${res.status}`);
  const data = await res.json();
  return data?.datan?.hits ?? data.hits ?? [];
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("secret") !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RAPID_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RAPID_API_KEY not configured" }, { status: 500 });
  }

  let synced = 0;

  for (const purpose of PURPOSES) {
    const hits = await fetchPage(purpose, apiKey);
    for (const h of hits) {
      await db
        .insert(properties)
        .values({
          externalId:    String(h.externalID),
          title:         h.title ?? null,
          price:         h.price ?? null,
          rentFrequency: h.rentFrequency ?? null,
          rooms:         h.rooms ?? null,
          baths:         h.baths ?? null,
          area:          h.area ?? null,
          isVerified:    h.isVerified ?? false,
          coverPhoto:    h.coverPhoto ?? null,
          agency:        h.agency ?? null,
          purpose:       h.purpose ?? purpose,
          category:      h.category ?? [],
          location:      h.location ?? null,
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
          },
        });
      synced++;
    }
  }

  return NextResponse.json({ synced });
}
