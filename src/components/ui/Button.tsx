"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-btn hover:bg-primary/90 hover:shadow-btn-hover active:scale-[0.98]",
        secondary:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white active:scale-[0.98] dark:text-primary dark:hover:text-white",
        ghost:
          "bg-transparent text-body-color hover:bg-gray-light hover:text-primary dark:text-white/70 dark:hover:bg-dark dark:hover:text-white",
        default:
          "bg-primary text-white shadow-btn hover:bg-primary/90 hover:shadow-btn-hover active:scale-[0.98]",
        outline:
          "border border-stroke-stroke bg-transparent text-dark hover:bg-gray-light dark:border-stroke-dark dark:text-white dark:hover:bg-dark",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-base font-semibold",
        default: "h-10 px-6 text-base",
        xs: "h-7 px-3 text-xs",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

function Button({ className, variant, size, loading, disabled, children, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </ButtonPrimitive>
  );
}

export default Button;
export { Button, buttonVariants };
