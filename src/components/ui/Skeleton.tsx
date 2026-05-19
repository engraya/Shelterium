import * as React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-one dark:bg-dark">
      <Skeleton className="aspect-[37/22] w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-4 h-4 w-1/2" />
        <div className="flex items-center gap-5 pt-3">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard };
export default Skeleton;
