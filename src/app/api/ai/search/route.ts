import { NextRequest, NextResponse } from "next/server";
import { genai } from "@/lib/ai/client";
import { z } from "zod";

const FilterParamsSchema = z.object({
  minPrice: z.number().nullable().optional(),
  maxPrice: z.number().nullable().optional(),
  roomsMin: z.number().nullable().optional(),
  bathsMin: z.number().nullable().optional(),
  areaMax: z.number().nullable().optional(),
  furnishingStatus: z.enum(["furnished", "unfurnished"]).nullable().optional(),
  rentFrequency: z.enum(["daily", "weekly", "monthly", "yearly"]).nullable().optional(),
  categoryExternalID: z.number().nullable().optional(),
  sort: z.enum(["price-asc", "price-desc", "verified-score", "city-level-score"]).nullable().optional(),
});

const SYSTEM_PROMPT = `You are a UAE real estate search assistant. Parse natural language queries into structured filter parameters for a Dubai/Abu Dhabi property database.

Return ONLY valid JSON matching this exact schema (use null for fields not mentioned):
{
  "minPrice": number | null,
  "maxPrice": number | null,
  "roomsMin": number | null,
  "bathsMin": number | null,
  "areaMax": number | null,
  "furnishingStatus": "furnished" | "unfurnished" | null,
  "rentFrequency": "daily" | "weekly" | "monthly" | "yearly" | null,
  "categoryExternalID": 4 | 16 | 3 | 18 | 21 | null,
  "sort": "price-asc" | "price-desc" | "verified-score" | "city-level-score" | null
}

Category IDs: 4=Apartment, 16=Townhouse, 3=Villa, 18=Penthouse, 21=Hotel Apartment
Prices are in AED. If user says "per month", multiply by 12 for yearly equivalent.
If user mentions "cheap" or "affordable", set sort to "price-asc".
If user mentions "luxury" or "premium", set sort to "price-desc".
Return ONLY the JSON object, no explanation, no markdown.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body?.query;

    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const model = genai.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: { maxOutputTokens: 256 },
    });
    const response = await model.generateContent(query);
    const raw = response.response.text().trim();
    const parsed = FilterParamsSchema.parse(JSON.parse(raw));

    // Strip null values — only return fields that were actually set
    const result = Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => v !== null && v !== undefined),
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to parse query" }, { status: 500 });
  }
}
