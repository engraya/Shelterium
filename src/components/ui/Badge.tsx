import { type ReactNode } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { cn } from "@/lib/cn";

type Variant = "verified" | "for-sale" | "for-rent" | "category" | "neutral";

const variantClasses: Record<Variant, string> = {
  verified: "bg-success/15 text-success border border-success/20",
  "for-sale": "bg-primary/10 text-primary border border-primary/20",
  "for-rent": "bg-yellow/15 text-yellow border border-yellow/20",
  category: "bg-gray-light text-body-color dark:bg-dark dark:text-body-color-dark border border-stroke-stroke dark:border-stroke-dark",
  neutral: "bg-gray-light text-body-color dark:bg-dark dark:text-body-color-dark",
};

type BadgeProps = {
  variant?: Variant;
  children?: ReactNode;
  className?: string;
};

const Badge = ({ variant = "neutral", children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {variant === "verified" && <MdVerifiedUser className="h-3 w-3" aria-hidden="true" />}
      {children ?? (variant === "verified" ? "Verified" : null)}
    </span>
  );
};

export default Badge;
