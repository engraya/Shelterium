"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  DollarSign,
  Bed,
  Bath,
  Maximize2,
  Sofa,
  ArrowUpDown,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import SearchDropdown from "@/components/SearchDropdown";
import { filterData } from "utils/filterData";
import type { PropertyListParams } from "@/types/property";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  onFilter: (params: Partial<PropertyListParams>) => void;
  onReset?: () => void;
  purpose?: "buy" | "rent";
};

/* ── Filter metadata ─────────────────────────────────────── */
const FILTER_ICON: Record<string, LucideIcon> = {
  categoryExternalID: Home,
  minPrice: DollarSign,
  maxPrice: DollarSign,
  roomsMin: Bed,
  bathsMin: Bath,
  areaMax: Maximize2,
  furnishingStatus: Sofa,
  sort: ArrowUpDown,
  rentFrequency: Calendar,
};

const FILTER_LABEL: Record<string, string> = {
  categoryExternalID: "Property Type",
  minPrice: "Min Price",
  maxPrice: "Max Price",
  roomsMin: "Bedrooms",
  bathsMin: "Bathrooms",
  areaMax: "Max Area",
  furnishingStatus: "Furnishing",
  sort: "Sort By",
  rentFrequency: "Frequency",
};

const PRIMARY_KEYS = new Set(["categoryExternalID", "minPrice", "maxPrice", "roomsMin"]);
const ADVANCED_KEYS = new Set(["bathsMin", "areaMax", "furnishingStatus", "sort", "rentFrequency"]);

export default function FilterBar({ onFilter, onReset, purpose }: FilterBarProps) {
  const [filters, setFilters] = useState<Partial<PropertyListParams>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChange = (queryName: keyof PropertyListParams, value: string) => {
    const updated = { ...filters, [queryName]: value || undefined };
    setFilters(updated);
    onFilter(updated);
  };

  const handleReset = () => {
    setFilters({});
    setMobileOpen(false);
    setShowAdvanced(false);
    onReset?.();
  };

  /* ── Derived state ────────────────────────────────────── */
  const primaryFilters = filterData.filter((f) => PRIMARY_KEYS.has(f.queryName));
  const advancedFilters = filterData.filter(
    (f) =>
      ADVANCED_KEYS.has(f.queryName) &&
      !(purpose === "buy" && f.queryName === "rentFrequency"),
  );

  const activeFilters = filterData.flatMap((f) => {
    if (f.queryName === "purpose") return [];
    const val = filters[f.queryName as keyof PropertyListParams];
    if (!val) return [];
    const item = f.items.find((i) => i.value === String(val));
    return item
      ? [{ queryName: f.queryName, displayLabel: item.name, groupLabel: FILTER_LABEL[f.queryName] ?? f.placeholder }]
      : [];
  });

  const hasActiveFilters = activeFilters.length > 0;
  const activeAdvancedCount = advancedFilters.filter(
    (f) => filters[f.queryName as keyof PropertyListParams],
  ).length;

  /* ── Shared filter field renderer ────────────────────── */
  const renderField = (filter: (typeof filterData)[0], className?: string) => {
    const Icon = FILTER_ICON[filter.queryName];
    const label = FILTER_LABEL[filter.queryName] ?? filter.placeholder;
    const val = (filters[filter.queryName as keyof PropertyListParams] as string) ?? "";

    return (
      <div key={filter.queryName} className={cn("flex flex-col gap-1.5", className)}>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-body-color dark:text-body-color-dark">
          {Icon && <Icon className="h-3.5 w-3.5 text-property-icon" aria-hidden="true" />}
          {label}
        </span>
        <SearchDropdown
          items={filter.items}
          placeholder={filter.placeholder}
          value={val}
          onChange={(value) => handleChange(filter.queryName as keyof PropertyListParams, value)}
        />
      </div>
    );
  };

  return (
    <div className="mb-8">
      {/* ══════════════ DESKTOP BAR ══════════════ */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-2xl border border-stroke-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-dark">
          {/* Primary filter row */}
          <div className="flex items-end gap-4 p-5">
            {primaryFilters.map((f) => renderField(f, "flex-1 min-w-0"))}

            {/* More Filters toggle */}
            <div className="flex shrink-0 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-transparent select-none">
                &nbsp;
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                aria-expanded={showAdvanced}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  showAdvanced
                    ? "border-primary bg-primary/5 text-primary dark:bg-primary/10"
                    : "border-stroke-stroke text-body-color hover:border-primary/60 hover:text-primary dark:border-stroke-dark dark:text-body-color-dark",
                )}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                More
                {activeAdvancedCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {activeAdvancedCount}
                  </span>
                )}
                {showAdvanced ? (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Reset — only when there are active filters */}
            {hasActiveFilters && (
              <div className="flex shrink-0 flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-transparent select-none">
                  &nbsp;
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/5"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Advanced filter row — slides in/out */}
          {showAdvanced && (
            <div className="border-t border-stroke-stroke px-5 pb-5 pt-4 dark:border-stroke-dark">
              <div className="flex items-end gap-4">
                {advancedFilters.map((f) => renderField(f, "flex-1 min-w-0"))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════ MOBILE PANEL ══════════════ */}
      <div className="lg:hidden">
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border bg-white px-5 py-3.5 transition-all dark:bg-dark",
            mobileOpen
              ? "border-primary shadow-card dark:border-primary"
              : "border-stroke-stroke shadow-one dark:border-stroke-dark",
          )}
        >
          <span className="flex items-center gap-2.5 text-sm font-semibold text-dark dark:text-white">
            <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeFilters.length}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-body-color transition-transform duration-200",
              mobileOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        {/* Collapsible filter grid */}
        {mobileOpen && (
          <div className="mt-2 animate-slide-up rounded-2xl border border-stroke-stroke bg-white p-4 shadow-two dark:border-stroke-dark dark:bg-dark">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {[...primaryFilters, ...advancedFilters].map((f) => renderField(f))}
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end border-t border-stroke-stroke pt-4 dark:border-stroke-dark">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm font-medium text-danger transition-colors hover:opacity-80"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Reset All
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════ ACTIVE FILTER CHIPS ══════════════ */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-medium text-body-color dark:text-body-color-dark">
            Active:
          </span>

          {activeFilters.map(({ queryName, displayLabel, groupLabel }) => (
            <button
              key={queryName}
              type="button"
              onClick={() => handleChange(queryName as keyof PropertyListParams, "")}
              className="flex items-center gap-1.5 rounded-pill border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 dark:bg-primary/10"
            >
              <span className="text-primary/60 text-[10px] uppercase tracking-wide">
                {groupLabel}:
              </span>
              {displayLabel}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          ))}

          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-danger transition-colors hover:opacity-80"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
