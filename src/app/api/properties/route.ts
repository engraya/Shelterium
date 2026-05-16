import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { toListItem } from "@/lib/db/mappers";
import { and, eq, gte, lte, desc, asc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const p = new URL(request.url).searchParams;

  const purpose         = p.get("purpose") ?? "for-sale";
  const rentFrequency   = p.get("rentFrequency") ?? undefined;
  const furnishingStatus = p.get("furnishingStatus") ?? undefined;
  const minPrice        = p.get("minPrice")  ? Number(p.get("minPrice"))  : undefined;
  const maxPrice        = p.get("maxPrice")  ? Number(p.get("maxPrice"))  : undefined;
  const roomsMin        = p.get("roomsMin")  ? Number(p.get("roomsMin"))  : undefined;
  const bathsMin        = p.get("bathsMin")  ? Number(p.get("bathsMin"))  : undefined;
  const areaMax         = p.get("areaMax")   ? Number(p.get("areaMax"))   : undefined;
  const sortParam       = p.get("sort") ?? "city-level-score";

  const orderBy =
    sortParam === "price-asc"  ? asc(sql`${properties.price}::numeric`) :
    sortParam === "price-desc" ? desc(sql`${properties.price}::numeric`) :
    sortParam === "verified-score" ? desc(properties.isVerified) :
    desc(properties.isVerified);

  const rows = await db
    .select()
    .from(properties)
    .where(
      and(
        eq(properties.purpose, purpose),
        rentFrequency    ? eq(properties.rentFrequency, rentFrequency)       : undefined,
        furnishingStatus ? eq(properties.furnishingStatus, furnishingStatus) : undefined,
        minPrice !== undefined ? gte(sql`${properties.price}::numeric`, minPrice) : undefined,
        maxPrice !== undefined ? lte(sql`${properties.price}::numeric`, maxPrice) : undefined,
        roomsMin !== undefined ? gte(properties.rooms, roomsMin)                  : undefined,
        bathsMin !== undefined ? gte(properties.baths, bathsMin)                  : undefined,
        areaMax  !== undefined ? lte(sql`${properties.area}::numeric`, areaMax)   : undefined,
      ),
    )
    .orderBy(orderBy)
    .limit(30);

  return NextResponse.json(rows.map(toListItem));
}
