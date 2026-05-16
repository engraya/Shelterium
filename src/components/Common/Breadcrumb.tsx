import Link from "next/link";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden bg-gray-light pt-28 pb-12 dark:bg-dark lg:pt-[150px]">
      {/* Subtle top-right glow */}
      <div
        className="absolute right-0 top-0 z-[-1] h-72 w-72 -translate-y-1/3 translate-x-1/3 rounded-full bg-primary opacity-[0.06] blur-3xl"
        aria-hidden="true"
      />

      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12">
            <div className="mb-6 max-w-[570px] md:mb-0">
              <h1 className="mb-3 text-heading-1 font-bold text-dark dark:text-white">
                {pageName}
              </h1>
              {description && (
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="w-full px-4 md:w-4/12 lg:w-5/12">
            <nav aria-label="Breadcrumb" className="flex items-center justify-start md:justify-end">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="font-medium text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <svg className="h-3 w-3 text-body-color" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li aria-current="page" className="font-medium text-primary">
                  {pageName}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
