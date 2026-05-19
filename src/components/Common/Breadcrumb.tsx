import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden pb-12 pt-28 lg:pt-[150px]">
      {/* Base background */}
      <div className="absolute inset-0 bg-gray-light dark:bg-dark" />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #4A6CF7 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Top-right glow */}
      <div
        className="absolute right-0 top-0 z-[-1] h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary opacity-[0.08] blur-3xl dark:opacity-[0.14]"
        aria-hidden="true"
      />
      {/* Bottom-left accent glow */}
      <div
        className="absolute bottom-0 left-0 z-[-1] h-64 w-64 translate-y-1/3 -translate-x-1/3 rounded-full bg-purple-500 opacity-[0.05] blur-3xl dark:opacity-[0.08]"
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Breadcrumb nav — appears above the title */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm">
          <Link
            href="/"
            className="font-medium text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-body-color/40 dark:text-body-color-dark/40" aria-hidden="true" />
          <span className="font-medium text-primary">{pageName}</span>
        </nav>

        <h1 className="mb-3 max-w-[600px] text-heading-1 font-bold text-dark dark:text-white">
          {pageName}
        </h1>

        {description && (
          <p className="max-w-[500px] text-base leading-relaxed text-body-color dark:text-body-color-dark">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default Breadcrumb;
