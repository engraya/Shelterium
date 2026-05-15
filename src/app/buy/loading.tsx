export default function BuyLoading() {
  return (
    <section className="pb-[120px] pt-[80px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div className="mb-10 animate-pulse overflow-hidden rounded-lg bg-white shadow-one dark:bg-dark">
                <div className="aspect-[37/22] w-full bg-gray-200 dark:bg-gray-700" />
                <div className="p-6">
                  <div className="mb-4 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="flex gap-4">
                    <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
