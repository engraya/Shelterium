import { NextRequest, NextResponse } from "next/server";
import { genai } from "@/lib/ai/client";
import { db } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { and, eq, gte, lte, sql, ne } from "drizzle-orm";
import { z } from "zod";

const RequestSchema = z.object({
  externalId: z.string(),
  price: z.number(),
  rooms: z.number(),
  area: z.number(),
  state: z.string(),
  purpose: z.string(),
  rentFrequency: z.string().nullable().optional(),
});

const SYSTEM_PROMPT = `You are a UAE real estate market analyst. Given a property's price and comparable listings, write a concise market position verdict.

Return ONLY valid JSON:
{
  "verdict": "below_market" | "at_market" | "above_market",
  "narrative": "2-3 sentence market analysis in plain English, mention AED amounts"
}

Be direct and helpful. Use "below market", "fairly priced", or "above market" naturally in the narrative. Do not use markdown.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { externalId, price, rooms, area, state, purpose, rentFrequency } =
      RequestSchema.parse(body);

    // Query comparable properties: same purpose/state, within ±1 room, area ±30%
    const areaLow = area * 0.7;
    const areaHigh = area * 1.3;
    const roomLow = Math.max(0, rooms - 1);
    const roomHigh = rooms + 1;

    const comps = await db
      .select({
        price: properties.price,
        rooms: properties.rooms,
        area: properties.area,
        rentFrequency: properties.rentFrequency,
      })
      .from(properties)
      .where(
        and(
          eq(properties.purpose, purpose),
          eq(properties.state, state),
          ne(properties.externalId, externalId),
          gte(properties.rooms, roomLow),
          lte(properties.rooms, roomHigh),
          gte(sql`${properties.area}::numeric`, areaLow),
          lte(sql`${properties.area}::numeric`, areaHigh),
          rentFrequency ? eq(properties.rentFrequency, rentFrequency) : undefined,
        ),
      )
      .limit(15);

    if (comps.length < 2) {
      return NextResponse.json({ error: "Insufficient comparable data" }, { status: 404 });
    }

    const compPrices = comps.map((c) => Number(c.price ?? 0)).filter((p) => p > 0);
    const avgPrice = compPrices.reduce((a, b) => a + b, 0) / compPrices.length;
    const minComp = Math.min(...compPrices);
    const maxComp = Math.max(...compPrices);

    const belowCount = compPrices.filter((p) => p > price).length;
    const percentile = Math.round((belowCount / compPrices.length) * 100);

    const verdict =
      percentile >= 65 ? "below_market" : percentile <= 35 ? "above_market" : "at_market";

    const promptUser = `Property price: AED ${price.toLocaleString()}${rentFrequency ? "/" + rentFrequency : ""}
Comparable listings (${compPrices.length} properties): avg AED ${Math.round(avgPrice).toLocaleString()}, range AED ${Math.round(minComp).toLocaleString()}–${Math.round(maxComp).toLocaleString()}
Percentile (cheaper than ${percentile}% of comparables): ${percentile}%
Market position: ${verdict}
Location: ${state}`;

    const model = genai.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: { maxOutputTokens: 200 },
    });
    const result = await model.generateContent(promptUser);
    const raw = result.response.text().trim();
    const aiResult = JSON.parse(raw) as { verdict: string; narrative: string };

    return NextResponse.json({
      verdict,
      narrative: aiResult.narrative,
      avgPrice: Math.round(avgPrice),
      minPrice: Math.round(minComp),
      maxPrice: Math.round(maxComp),
      comparableCount: compPrices.length,
      percentile,
    });
  } catch {
    return NextResponse.json({ error: "Price analysis failed" }, { status: 500 });
  }
}
