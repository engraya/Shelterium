import Link from "next/link";
import Button from "@/components/ui/Button";
import { TbHomeOff } from "react-icons/tb";

export default function PropertyNotFound() {
  return (
    <section className="relative z-10 flex min-h-screen items-center py-[120px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <TbHomeOff className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Not Available
          </p>
          <h1 className="mb-4 text-heading-1 font-bold text-dark dark:text-white">
            Property Not Found
          </h1>
          <p className="mb-8 max-w-md text-base text-body-color dark:text-body-color-dark">
            This rental property no longer exists or has been removed from our listings.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/rent">
              <Button variant="primary" size="lg">
                Browse Rentals
              </Button>
            </Link>
            <Link href="/buy">
              <Button variant="secondary" size="lg">
                Properties for Sale
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
