import { SkeletonCard } from "@/components/ui/Skeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function BuyLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="bg-primary/5 py-12 pt-[150px] dark:bg-dark">
        <div className="container">
          <Skeleton className="mx-auto mb-3 h-8 w-64" />
          <Skeleton className="mx-auto h-4 w-96" />
        </div>
      </div>
      {/* Grid skeleton */}
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          {/* Filter bar skeleton */}
          <Skeleton className="mb-8 h-14 w-full rounded-xl" />
          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
