"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterItem = {
  name: string;
  value: string;
};

type SearchDropdownProps = {
  items: FilterItem[];
  onChange: (value: string) => void;
  placeholder: string;
  value?: string;
  className?: string;
};

export default function SearchDropdown({
  items,
  onChange,
  placeholder,
  value = "",
  className,
}: SearchDropdownProps) {
  const isActive = value !== "";

  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        className={cn(
          // Base
          "w-full cursor-pointer appearance-none rounded-xl border px-3 py-2.5 pr-9 text-sm transition-colors",
          // Focus
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          // Light mode
          "bg-white text-dark",
          // Dark mode
          "dark:bg-dark dark:text-white",
          // Border: active vs idle
          isActive
            ? "border-primary/50 font-medium text-primary focus:border-primary dark:border-primary/50 dark:text-primary"
            : "border-stroke-stroke focus:border-primary dark:border-stroke-dark",
        )}
      >
        {/* Placeholder option — selecting it clears the filter */}
        <option value="" className="text-body-color dark:text-body-color-dark">
          {placeholder}
        </option>

        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Chevron overlay — pointer-events-none so clicks pass through to select */}
      <ChevronDown
        className={cn(
          "pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          isActive ? "text-primary" : "text-body-color dark:text-body-color-dark",
        )}
        aria-hidden="true"
      />
    </div>
  );
}
