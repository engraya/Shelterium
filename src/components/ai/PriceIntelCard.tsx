"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, Minus, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PropertyDetail } from "@/types/property";

type PriceData = {
  verdict: "below_market" | "at_market" | "above_market";
  narrative: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  comparableCount: number;
  percentile: number;
};

const VERDICT_CONFIG = {
  below_market: {
    label: "Below Market",
    icon: TrendingDown,
    color: "text-success",
    bg: "bg-success/10 dark:bg-success/15",
    border: "border-success/30",
    dot: "bg-success",
  },
  at_market: {
    label: "Fairly Priced",
    icon: Minus,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 dark:bg-yellow-500/15",
    border: "border-yellow-500/30",
    dot: "bg-yellow-500",
  },
  above_market: {
    label: "Above Market",
    icon: TrendingUp,
    color: "text-danger",
    bg: "bg-danger/10 dark:bg-danger/15",
    border: "border-danger/30",
    dot: "bg-danger",
  },
};

type Props = { property: PropertyDetail };

export default function PriceIntelCard({ property }: Props) {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch("/api/ai/price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            externalId: property.externalID,
            price: property.price,
            rooms: property.rooms,
            area: property.area,
            state: property.state,
            purpose: property.purpose,
            rentFrequency: property.rentFrequency,
          }),
        });

        if (!res.ok) {
          setError(true);
          return;
        }

        setData(await res.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, [property]);

  if (error) return null;

  return (
    <Card className="mt-4 overflow-hidden dark:border-stroke-dark dark:bg-dark">
      <CardHeader className="pb-0 pt-4 px-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-body-color dark:text-body-color-dark">
          AI Price Analysis
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-4 pt-3">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-body-color dark:text-body-color-dark">
            <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
            Analyzing comparable listings…
          </div>
        ) : data ? (
          <>
            {/* Verdict badge */}
            {(() => {
              const cfg = VERDICT_CONFIG[data.verdict];
              const Icon = cfg.icon;
              return (
                <div
                  className={cn(
                    "mb-3 flex items-center gap-2 rounded-lg border px-3 py-2",
                    cfg.bg,
                    cfg.border,
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", cfg.color)} aria-hidden="true" />
                  <span className={cn("text-sm font-semibold", cfg.color)}>{cfg.label}</span>
                  <span className="ml-auto text-[11px] text-body-color dark:text-body-color-dark">
                    vs {data.comparableCount} similar
                  </span>
                </div>
              );
            })()}

            {/* Narrative */}
            <p className="text-xs leading-relaxed text-body-color dark:text-body-color-dark">
              {data.narrative}
            </p>

            {/* Expandable market range */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 flex items-center gap-1 text-[11px] font-medium text-primary transition-opacity hover:opacity-70"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3" aria-hidden="true" /> Hide details
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" aria-hidden="true" /> Market range
                </>
              )}
            </button>

            {expanded && (
              <div className="mt-3 space-y-2 border-t border-stroke-stroke pt-3 dark:border-stroke-dark">
                {[
                  { label: "Market avg", value: data.avgPrice },
                  { label: "Range low", value: data.minPrice },
                  { label: "Range high", value: data.maxPrice },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-body-color dark:text-body-color-dark">{label}</span>
                    <span className="font-medium text-dark dark:text-white">
                      AED {value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
