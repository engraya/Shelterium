import { NextRequest, NextResponse } from "next/server";

const BAYUT_BASE_URL = "https://bayut.p.rapidapi.com";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const apiKey = process.env.RAPID_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${BAYUT_BASE_URL}/properties/detail?externalID=${encodeURIComponent(id)}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        },
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: "Upstream API error", code: response.status },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch property details" }, { status: 500 });
  }
}
