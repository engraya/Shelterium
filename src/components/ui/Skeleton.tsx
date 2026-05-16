import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)} />
);

export const SkeletonCard = () => (
  <div className="overflow-hidden rounded-card bg-white shadow-one dark:bg-dark">
    {/* Photo area */}
    <Skeleton className="aspect-[37/22] w-full rounded-none" />
    {/* Content */}
    <div className="p-6">
      <Skeleton className="mb-3 h-5 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <div className="flex items-center gap-6 pt-3">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  </div>
);

export default Skeleton;
