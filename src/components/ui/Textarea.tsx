import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-dark dark:text-white">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-md border bg-gray-light px-4 py-3 text-base text-dark outline-none transition-colors duration-200 resize-none",
            "placeholder:text-body-color",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "dark:bg-gray-dark dark:border-stroke-dark dark:text-white dark:placeholder:text-body-color-dark dark:focus:border-primary",
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-stroke-stroke",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-body-color dark:text-body-color-dark">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
