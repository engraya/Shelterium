import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { toListItem, toDetail } from "@/lib/db/mappers";
import { eq, desc } from "drizzle-orm";
import type { PropertyListItem, PropertyDetail } from "@/types/property";

export const baseUrl = "https://bayut.p.rapidapi.com";

export async function getForRentData(): Promise<PropertyListItem[]> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.purpose, "for-rent"))
    .orderBy(desc(properties.isVerified))
    .limit(30);
  return rows.map(toListItem);
}

export async function getForSaleData(): Promise<PropertyListItem[]> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.purpose, "for-sale"))
    .orderBy(desc(properties.isVerified))
    .limit(30);
  return rows.map(toListItem);
}

export async function getPropertyDetails(id: string): Promise<PropertyDetail | null> {
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.externalId, id))
    .limit(1);
  return rows[0] ? toDetail(rows[0]) : null;
}
