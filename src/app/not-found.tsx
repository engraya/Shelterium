import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative z-10 py-[120px]">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto max-w-[530px]">
            <h1 className="mb-4 text-[80px] font-bold leading-none text-primary">
              404
            </h1>
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              Page Not Found
            </h2>
            <p className="mb-8 text-base font-medium text-body-color">
              The page you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-block rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
