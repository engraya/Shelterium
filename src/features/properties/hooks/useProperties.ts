"use client";

import { useQuery } from "@tanstack/react-query";
import type { PropertyListItem, PropertyListParams } from "@/types/property";

async function fetchPropertiesClient(params: Partial<PropertyListParams>): Promise<PropertyListItem[]> {
  const searchParams = new URLSearchParams();
  if (params.purpose) searchParams.set("purpose", params.purpose);
  if (params.minPrice) searchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice) searchParams.set("maxPrice", String(params.maxPrice));
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.rentFrequency) searchParams.set("rentFrequency", params.rentFrequency);
  if (params.furnishingStatus) searchParams.set("furnishingStatus", params.furnishingStatus);
  if (params.roomsMin) searchParams.set("roomsMin", String(params.roomsMin));
  if (params.bathsMin) searchParams.set("bathsMin", String(params.bathsMin));
  if (params.areaMax) searchParams.set("areaMax", String(params.areaMax));
  if (params.categoryExternalID) searchParams.set("categoryExternalID", String(params.categoryExternalID));

  const res = await fetch(`/api/properties?${searchParams}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status}`);
  }
  return res.json();
}

export function useProperties(params: Partial<PropertyListParams>) {
  return useQuery<PropertyListItem[], Error>({
    queryKey: ["properties", params],
    queryFn: () => fetchPropertiesClient(params),
    enabled: !!params.purpose,
  });
}
