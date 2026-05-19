"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

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
    <section className="relative z-10 flex min-h-screen items-center py-[120px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-danger/10">
            <svg
              className="h-12 w-12 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-danger">
            Error
          </p>
          <h1 className="mb-4 text-heading-1 font-bold text-dark dark:text-white">
            Something Went Wrong
          </h1>
          <p className="mb-8 max-w-md text-base text-body-color dark:text-body-color-dark">
            An unexpected error occurred. Please try again, or return to the home page.
          </p>

          <div className="flex items-center gap-4">
            <Button variant="primary" size="lg" onClick={reset}>
              Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
