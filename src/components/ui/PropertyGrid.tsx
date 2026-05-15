import type { PropertyListItem } from "@/types/property";
import PropertyCard from "./PropertyCard";

type PropertyGridProps = {
  properties: PropertyListItem[];
  path: "buy" | "rent";
  isLoading?: boolean;
};

function PropertyCardSkeleton() {
  return (
    <div className="mb-10 animate-pulse overflow-hidden rounded-lg bg-white shadow-one dark:bg-dark">
      <div className="aspect-[37/22] w-full bg-gray-200 dark:bg-gray-700" />
      <div className="p-6">
        <div className="mb-4 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-4">
          <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default function PropertyGrid({ properties, path, isLoading = false }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="-mx-4 flex flex-wrap justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <PropertyCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-2xl font-semibold text-body-color">No properties found</p>
        <p className="mt-2 text-base text-body-color">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="-mx-4 flex flex-wrap justify-center">
      {properties.map((property) => (
        <div
          key={property.id}
          className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
        >
          <PropertyCard property={property} path={path} />
        </div>
      ))}
    </div>
  );
}
