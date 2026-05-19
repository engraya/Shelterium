import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <Label htmlFor={inputId} className="text-sm font-medium text-dark dark:text-white">
            {label}
          </Label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "flex h-10 w-full rounded-md border border-stroke-stroke bg-white px-3 py-2 text-sm text-dark ring-offset-background transition-colors placeholder:text-body-color/60 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:placeholder:text-body-color-dark/60",
            error && "border-danger focus-visible:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-body-color dark:text-body-color-dark">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
export { Input };
