"use client";

import { useState, useCallback } from "react";
import FilterBar from "./FilterBar";
import PropertyGrid from "./PropertyGrid";
import NLSearchBar from "@/components/ai/NLSearchBar";
import type { PropertyListItem, PropertyListParams } from "@/types/property";
import { useProperties } from "@/features/properties/hooks/useProperties";

type PropertyBrowserProps = {
  initialProperties: PropertyListItem[];
  purpose: "buy" | "rent";
};

export default function PropertyBrowser({ initialProperties, purpose }: PropertyBrowserProps) {
  const purposeValue = purpose === "buy" ? "for-sale" : "for-rent";

  const [activeParams, setActiveParams] = useState<Partial<PropertyListParams> | null>(null);

  const { data, isLoading } = useProperties(activeParams ?? { purpose: purposeValue });

  // Prefer SSR data on first render; fall back to client data when SSR is empty
  const showSSR = activeParams === null && initialProperties.length > 0;
  const properties = showSSR ? initialProperties : (data ?? []);
  const loading = isLoading && !showSSR;

  const handleFilter = useCallback(
    (newParams: Partial<PropertyListParams>) => {
      setActiveParams({ purpose: purposeValue, ...newParams });
    },
    [purposeValue],
  );

  const handleReset = useCallback(() => {
    setActiveParams(null);
  }, []);

  return (
    <>
      <NLSearchBar onResult={handleFilter} purpose={purpose} />
      <FilterBar onFilter={handleFilter} onReset={handleReset} purpose={purpose} />
      <PropertyGrid
        properties={properties}
        path={purpose}
        isLoading={loading}
        onReset={handleReset}
      />
    </>
  );
}
