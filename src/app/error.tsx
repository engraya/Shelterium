"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative z-10 py-[120px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-[530px]">
            <div className="mb-8 text-[80px] font-bold leading-none text-primary opacity-20">
              Oops
            </div>
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              Something went wrong
            </h1>
            <p className="mb-8 text-base font-medium text-body-color">
              An unexpected error occurred. Please try again, or return to the
              home page.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="rounded-sm border border-primary px-8 py-3 text-base font-medium text-primary duration-300 hover:bg-primary hover:text-white"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
