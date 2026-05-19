"use client";

import { useQuery } from "@tanstack/react-query";
import type { PropertyDetail } from "@/types/property";

async function fetchPropertyDetailClient(id: string): Promise<PropertyDetail> {
  const res = await fetch(`/api/properties/${encodeURIComponent(id)}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Property not found");
    throw new Error(`Failed to fetch property: ${res.status}`);
  }
  return res.json();
}

export function usePropertyDetail(id: string) {
  return useQuery<PropertyDetail, Error>({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyDetailClient(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}
