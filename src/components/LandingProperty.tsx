import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Bed, Bath, LayoutGrid, BadgeCheck } from "lucide-react";
import millify from "millify";

type StaticPropertyItem = {
  id: number;
  title: string;
  rooms: number;
  baths: number;
  area: number;
  rentFrequency: string | null;
  isVerified: boolean;
  coverPhoto: StaticImageData;
  agencyPhoto: StaticImageData;
  price: number;
};

function LandingProperty({ item }: { item: StaticPropertyItem }) {
  const safeArea = Number(item.area) || 0;

  return (
    <article className="group overflow-hidden rounded-card bg-white shadow-one transition-shadow duration-200 hover:shadow-card-hover dark:bg-dark">
      <Link href={`/buy/${item.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={item.coverPhoto}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {item.isVerified && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" />
            Verified
          </div>
        )}
      </Link>

      <div className="p-5">
        <p className="mb-1 text-xl font-bold text-dark dark:text-white">
          AED {millify(Number(item.price) || 0)}
          {item.rentFrequency && (
            <span className="ml-1 text-sm font-normal text-body-color dark:text-body-color-dark">
              /{item.rentFrequency}
            </span>
          )}
        </p>

        <Link
          href={`/buy/${item.id}`}
          className="mb-4 block text-sm font-medium leading-snug text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary line-clamp-2"
        >
          {item.title}
        </Link>

        <div className="flex items-center gap-4 border-t border-stroke-stroke pt-4 text-sm text-body-color dark:border-stroke-dark dark:text-body-color-dark">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" aria-hidden="true" />
            {item.rooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" aria-hidden="true" />
            {item.baths} Bath
          </span>
          <span className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            {millify(safeArea)} sqft
          </span>
        </div>
      </div>
    </article>
  );
}

export default LandingProperty;
