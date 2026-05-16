import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative z-10 flex min-h-screen items-center py-[120px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            404 Error
          </p>
          <h1 className="mb-4 text-heading-1 font-bold text-dark dark:text-white">
            Page Not Found
          </h1>
          <p className="mb-8 max-w-md text-base text-body-color dark:text-body-color-dark">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link href="/buy">
              <Button variant="secondary" size="lg">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
