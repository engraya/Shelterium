import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-pill border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        /* shadcn-compatible */
        default: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-danger text-white",
        outline: "border-stroke-stroke text-dark dark:border-stroke-dark dark:text-white",
        /* Domain-specific */
        verified:
          "border-transparent bg-success/15 text-success",
        "for-sale":
          "border-transparent bg-primary text-white",
        "for-rent":
          "border-transparent bg-yellow/20 text-yellow-700 dark:text-yellow",
        neutral:
          "border-stroke-stroke bg-gray-light text-dark dark:border-stroke-dark dark:bg-dark dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  const isVerified = variant === "verified";
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {isVerified && <BadgeCheck className="h-3 w-3" aria-hidden="true" />}
      {isVerified && !children ? "Verified" : children}
    </span>
  );
}

export { Badge, badgeVariants };
export default Badge;
