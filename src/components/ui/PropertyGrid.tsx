"use client";

import { useState } from "react";
import { Building2, LayoutGrid, List } from "lucide-react";
import type { PropertyListItem } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { SkeletonCard } from "./Skeleton";
import Button from "./Button";
import { cn } from "@/lib/utils";

type PropertyGridProps = {
  properties: PropertyListItem[];
  path: "buy" | "rent";
  isLoading?: boolean;
  onReset?: () => void;
};

export default function PropertyGrid({
  properties,
  path,
  isLoading = false,
  onReset,
}: PropertyGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-light dark:bg-dark">
          <Building2 className="h-10 w-10 text-body-color/40 dark:text-body-color-dark/40" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
          No properties found
        </h3>
        <p className="mb-6 max-w-sm text-base text-body-color dark:text-body-color-dark">
          We couldn&apos;t find any properties matching your filters. Try adjusting your search criteria.
        </p>
        {onReset && (
          <Button variant="secondary" onClick={onReset}>
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Results header with view toggle */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-body-color dark:text-body-color-dark">
          Showing <span className="font-semibold text-dark dark:text-white">{properties.length}</span> properties
        </p>
        <div className="flex items-center gap-1 rounded-lg border border-stroke-stroke p-1 dark:border-stroke-dark">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded transition-colors",
              view === "grid"
                ? "bg-primary text-white"
                : "text-body-color hover:text-primary dark:text-body-color-dark"
            )}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-label="List view"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded transition-colors",
              view === "list"
                ? "bg-primary text-white"
                : "text-body-color hover:text-primary dark:text-body-color-dark"
            )}
          >
            <List className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={cn(
        "gap-6",
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col"
      )}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            path={path}
            variant={view}
          />
        ))}
      </div>
    </>
  );
}
