"use client";

import { useState, useRef } from "react";
import { Search, Sparkles, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyListParams } from "@/types/property";

const SUGGESTIONS = [
  "Furnished 2-bed apartment under 120k/year",
  "3 bedroom villa in Dubai under 2M",
  "Studio near the beach, monthly rent",
  "Affordable 1-bed apartment, lowest price",
];

type NLSearchBarProps = {
  onResult: (params: Partial<PropertyListParams>) => void;
  purpose: "buy" | "rent";
  className?: string;
};

export default function NLSearchBar({ onResult, purpose, className }: NLSearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const purposeLabel = purpose === "buy" ? "for sale" : "for rent";

  async function handleSearch(text: string) {
    const q = text.trim();
    if (!q) return;

    setLoading(true);
    setError(null);
    setInterpretation(null);

    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) throw new Error("Search failed");

      const params = (await res.json()) as Partial<PropertyListParams>;

      // Build a readable interpretation summary
      const parts: string[] = [];
      if (params.roomsMin) parts.push(`${params.roomsMin}+ beds`);
      if (params.furnishingStatus) parts.push(params.furnishingStatus);
      if (params.categoryExternalID) {
        const catMap: Record<number, string> = {
          4: "apartment",
          3: "villa",
          16: "townhouse",
          18: "penthouse",
          21: "hotel apartment",
        };
        parts.push(catMap[params.categoryExternalID] ?? "property");
      }
      if (params.maxPrice)
        parts.push(`under AED ${Number(params.maxPrice).toLocaleString()}`);
      if (params.rentFrequency) parts.push(`(${params.rentFrequency}ly)`);

      if (parts.length > 0) {
        setInterpretation(`Showing: ${parts.join(", ")}`);
      }

      onResult(params);
    } catch {
      setError("Couldn't parse that — try rephrasing or use the filters below.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setQuery("");
    setInterpretation(null);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className={cn("mb-6", className)}>
      {/* Search input */}
      <div className="relative flex items-center overflow-hidden rounded-2xl border border-stroke-stroke bg-white shadow-card transition-all duration-200 focus-within:border-primary focus-within:shadow-card dark:border-stroke-dark dark:bg-dark dark:focus-within:border-primary">
        {/* Sparkle icon */}
        <div className="flex shrink-0 items-center pl-4">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          placeholder={`Describe what you're looking ${purposeLabel}… e.g. "furnished 2-bed near beach under 120k"`}
          className="flex-1 bg-transparent px-3 py-3.5 text-sm text-dark placeholder:text-body-color focus:outline-none dark:text-white dark:placeholder:text-body-color-dark"
          aria-label="AI property search"
        />

        {/* Clear button */}
        {query && !loading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex shrink-0 items-center px-2 text-body-color transition-colors hover:text-dark dark:text-body-color-dark dark:hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        {/* Search / loading button */}
        <button
          type="button"
          onClick={() => handleSearch(query)}
          disabled={loading || !query.trim()}
          aria-label="Search with AI"
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-r-2xl px-5 py-3.5 text-sm font-semibold text-white transition-all",
            loading || !query.trim()
              ? "bg-primary/60 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90",
          )}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{loading ? "Searching…" : "Search"}</span>
        </button>
      </div>

      {/* AI interpretation chip */}
      {interpretation && (
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/15">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {interpretation}
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-body-color underline-offset-2 hover:underline dark:text-body-color-dark"
          >
            Clear
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-2 text-xs text-danger">{error}</p>
      )}

      {/* Suggestion pills — only when empty */}
      {!query && !interpretation && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-[11px] font-medium text-body-color dark:text-body-color-dark">
            Try:
          </span>
          {SUGGESTIONS.slice(0, purpose === "buy" ? 2 : 4).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                handleSearch(s);
              }}
              className="rounded-pill border border-stroke-stroke px-3 py-1 text-xs text-body-color transition-colors hover:border-primary/40 hover:text-primary dark:border-stroke-dark dark:text-body-color-dark dark:hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
