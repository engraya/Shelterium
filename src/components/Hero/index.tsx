import Link from "next/link";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

const stats = [
  { value: "12,000+", label: "Listings" },
  { value: "Verified", label: "Agencies" },
  { value: "2 Cities", label: "Dubai & Abu Dhabi" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 z-[-1] opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#4A6CF7 1px, transparent 1px), linear-gradient(to right, #4A6CF7 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />
      {/* Top-right radial glow */}
      <div
        className="absolute right-0 top-0 z-[-1] h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary opacity-[0.07] blur-3xl"
        aria-hidden="true"
      />
      {/* Bottom-left radial glow */}
      <div
        className="absolute bottom-0 left-0 z-[-1] h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-purple-500 opacity-[0.04] blur-3xl"
        aria-hidden="true"
      />

      <div className="container">
        <div className="mx-auto max-w-[780px] text-center">
          {/* Trust pill badge */}
          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-pill border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary dark:border-primary/40 dark:bg-primary/10"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified Real Estate Platform
            </Badge>
          </div>

          <h1 className="mb-4 text-display font-extrabold tracking-tight text-black dark:text-white">
            <span className="block">Find Your Next Home</span>
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Buy, Rent &amp; Sell with Ease
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
            Thousands of verified listings across Dubai and Abu Dhabi — with filters, photos, and direct agent contact.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/buy">
              <Button size="lg" variant="primary">
                Explore Properties
              </Button>
            </Link>
            <Link href="/rent">
              <Button size="lg" variant="secondary">
                See Rentals
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-12 flex items-center justify-center gap-2">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-1 flex-col items-center justify-center rounded-xl border border-stroke-stroke/50 bg-white/5 px-4 py-3 backdrop-blur-sm dark:border-stroke-dark/50 dark:bg-white/[0.03]"
              >
                <p className="text-lg font-bold text-dark dark:text-white">{stat.value}</p>
                <p className="text-sm text-body-color dark:text-body-color-dark">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
