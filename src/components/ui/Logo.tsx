import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  iconSize?: number;
  /** Tailwind text-size class, e.g. "text-lg" */
  textClassName?: string;
};

export default function Logo({ className, iconSize = 30, textClassName = "text-[17px]" }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {/* Brand icon — always blue, no dark-mode inversion needed */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#4A6CF7" />
        <path d="M16 7L5 18H8V27H24V18H27L16 7Z" fill="white" />
        <rect x="13" y="20" width="6" height="7" fill="#4A6CF7" />
      </svg>

      {/* Wordmark — text color adapts to dark mode */}
      <span className={cn("font-bold leading-none whitespace-nowrap", textClassName)}>
        <span className="text-dark dark:text-white">Shelterium</span>
        <span className="text-primary"> AI</span>
      </span>
    </span>
  );
}
