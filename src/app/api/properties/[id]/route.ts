import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { toDetail } from "@/lib/db/mappers";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
  }

  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.externalId, id))
    .limit(1);

  if (!rows[0]) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  return NextResponse.json(toDetail(rows[0]));
}
