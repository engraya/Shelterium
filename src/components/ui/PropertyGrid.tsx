import type { PropertyListItem } from "@/types/property";
import PropertyCard from "./PropertyCard";
import { SkeletonCard } from "./Skeleton";
import Button from "./Button";
import { TbHomeOff } from "react-icons/tb";

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
          <TbHomeOff className="h-10 w-10 text-body-color dark:text-body-color-dark" aria-hidden="true" />
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
      <p className="mb-5 text-sm text-body-color dark:text-body-color-dark">
        Showing <span className="font-semibold text-dark dark:text-white">{properties.length}</span> properties
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} path={path} />
        ))}
      </div>
    </>
  );
}
