"use client";

import { cn } from "@/lib/cn";

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

function SearchDropdown({ items, onChange, placeholder, value = "", className }: SearchDropdownProps) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-lg border border-stroke-stroke bg-white px-4 py-2.5 pr-10 text-sm font-medium text-dark outline-none transition-colors duration-150",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          "dark:border-stroke-dark dark:bg-dark dark:text-white",
          value ? "border-primary text-primary dark:border-primary" : "text-body-color dark:text-body-color-dark",
        )}
        aria-label={placeholder}
      >
        <option value="">{placeholder}</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {/* Chevron icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center" aria-hidden="true">
        <svg className="h-4 w-4 text-body-color dark:text-body-color-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default SearchDropdown;
