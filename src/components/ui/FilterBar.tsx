"use client";

import { useState } from "react";
import SearchDropdown from "@/components/SearchDropdown";
import { filterData } from "utils/filterData";
import type { PropertyListParams } from "@/types/property";

type FilterBarProps = {
  onFilter: (params: Partial<PropertyListParams>) => void;
  purpose?: "buy" | "rent";
};

export default function FilterBar({ onFilter, purpose }: FilterBarProps) {
  const [filters, setFilters] = useState<Partial<PropertyListParams>>(
    purpose ? { purpose: purpose === "buy" ? "for-sale" : "for-rent" } : {}
  );

  const handleChange = (queryName: keyof PropertyListParams, value: string) => {
    const updated = { ...filters, [queryName]: value };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max flex-wrap items-center gap-2 rounded-lg bg-white p-4 shadow-one dark:bg-dark dark:shadow-none">
        {filterData.map((filter) => (
          <div key={filter.queryName} className="min-w-[150px]">
            <SearchDropdown
              items={filter.items}
              placeholder={filter.placeholder}
              onChange={(value) => handleChange(filter.queryName as keyof PropertyListParams, value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const reset: Partial<PropertyListParams> = purpose
              ? { purpose: purpose === "buy" ? "for-sale" : "for-rent" }
              : {};
            setFilters(reset);
            onFilter(reset);
          }}
          className="rounded-sm border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
