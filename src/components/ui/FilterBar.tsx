"use client";

import { useState } from "react";
import { TbAdjustmentsHorizontal, TbX } from "react-icons/tb";
import SearchDropdown from "@/components/SearchDropdown";
import { filterData } from "utils/filterData";
import type { PropertyListParams } from "@/types/property";
import Button from "./Button";

type FilterBarProps = {
  onFilter: (params: Partial<PropertyListParams>) => void;
  onReset?: () => void;
  purpose?: "buy" | "rent";
};

export default function FilterBar({ onFilter, onReset, purpose }: FilterBarProps) {
  const [filters, setFilters] = useState<Partial<PropertyListParams>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (queryName: keyof PropertyListParams, value: string) => {
    const updated = { ...filters, [queryName]: value || undefined };
    setFilters(updated);
    onFilter(updated);
  };

  const handleReset = () => {
    setFilters({});
    setMobileOpen(false);
    onReset?.();
  };

  // Active filter tags (excluding locked purpose when page-specific)
  const activeFilters = filterData.flatMap((filter) => {
    const val = filters[filter.queryName as keyof PropertyListParams];
    if (!val) return [];
    if (purpose && filter.queryName === "purpose") return [];
    const item = filter.items.find((i) => i.value === val);
    return item ? [{ queryName: filter.queryName, label: `${filter.placeholder}: ${item.name}` }] : [];
  });

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="mb-8">
      {/* Desktop filter row */}
      <div className="hidden flex-wrap items-center gap-3 rounded-xl border border-stroke-stroke bg-white p-4 shadow-one dark:border-stroke-dark dark:bg-dark lg:flex">
        {filterData.map((filter) => {
          if (purpose && filter.queryName === "purpose") return null;
          return (
            <div key={filter.queryName} className="min-w-[140px]">
              <SearchDropdown
                items={filter.items}
                placeholder={filter.placeholder}
                value={(filters[filter.queryName as keyof PropertyListParams] as string) ?? ""}
                onChange={(value) => handleChange(filter.queryName as keyof PropertyListParams, value)}
              />
            </div>
          );
        })}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="ml-auto shrink-0">
            <TbX className="h-4 w-4" aria-hidden="true" />
            Reset
          </Button>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-stroke-stroke bg-white px-4 py-3 shadow-one dark:border-stroke-dark dark:bg-dark"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-dark dark:text-white">
            <TbAdjustmentsHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {activeFilters.length}
              </span>
            )}
          </span>
          <svg
            className={`h-4 w-4 text-body-color transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <div className="mt-2 grid grid-cols-2 gap-3 rounded-xl border border-stroke-stroke bg-white p-4 shadow-two dark:border-stroke-dark dark:bg-dark">
            {filterData.map((filter) => {
              if (purpose && filter.queryName === "purpose") return null;
              return (
                <SearchDropdown
                  key={filter.queryName}
                  items={filter.items}
                  placeholder={filter.placeholder}
                  value={(filters[filter.queryName as keyof PropertyListParams] as string) ?? ""}
                  onChange={(value) => handleChange(filter.queryName as keyof PropertyListParams, value)}
                  className="col-span-1"
                />
              );
            })}
            {hasActiveFilters && (
              <div className="col-span-2 flex justify-end">
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <TbX className="h-4 w-4" aria-hidden="true" />
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilters.map(({ queryName, label }) => (
            <button
              key={queryName}
              type="button"
              onClick={() => handleChange(queryName as keyof PropertyListParams, "")}
              className="flex items-center gap-1.5 rounded-pill border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {label}
              <TbX className="h-3 w-3" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-pill border border-stroke-stroke px-3 py-1 text-xs font-medium text-body-color transition-colors hover:text-danger dark:border-stroke-dark dark:text-body-color-dark"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
