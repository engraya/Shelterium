import { NextRequest, NextResponse } from "next/server";

const BAYUT_BASE_URL = "https://bayut.p.rapidapi.com";

export async function GET(request: NextRequest) {
  const apiKey = process.env.RAPID_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const purpose = searchParams.get("purpose") ?? "for-sale";
  const hitsPerPage = searchParams.get("hitsPerPage") ?? "30";
  const sort = searchParams.get("sort") ?? "city-level-score";
  const rentFrequency = searchParams.get("rentFrequency") ?? undefined;
  const minPrice = searchParams.get("minPrice") ?? undefined;
  const maxPrice = searchParams.get("maxPrice") ?? undefined;
  const roomsMin = searchParams.get("roomsMin") ?? undefined;
  const bathsMin = searchParams.get("bathsMin") ?? undefined;
  const areaMax = searchParams.get("areaMax") ?? undefined;
  const categoryExternalID = searchParams.get("categoryExternalID") ?? undefined;

  const params = new URLSearchParams({
    locationExternalIDs: "5002,6020",
    purpose,
    hitsPerPage,
    lang: "en",
    sort,
    ...(rentFrequency && { rentFrequency }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(roomsMin && { roomsMin }),
    ...(bathsMin && { bathsMin }),
    ...(areaMax && { areaMax }),
    ...(categoryExternalID && { categoryExternalID }),
  });

  try {
    const response = await fetch(`${BAYUT_BASE_URL}/properties/list?${params}`, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Upstream API error", code: response.status },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.hits ?? []);
  } catch {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
