import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { defaultImage } from "assets";
import millify from "millify";
import type { PropertyListItem } from "@/types/property";
import Badge from "@/components/ui/Badge";

type PropertyCardProps = {
  property: PropertyListItem;
  path: "buy" | "rent";
};

const PropertyCard = ({ property, path }: PropertyCardProps) => {
  const safeArea = Number(property.area) || 0;
  const coverSrc = property.coverPhoto?.url ?? defaultImage;
  const formattedPrice = millify(Number(property.price) || 0);

  return (
    <article className="group relative overflow-hidden rounded-card bg-white shadow-one transition-shadow duration-200 hover:shadow-card-hover dark:bg-dark">
      {/* Image */}
      <Link
        href={`/${path}/${property.externalID}`}
        className="relative block aspect-[37/22] w-full overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={coverSrc}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="rounded-pill bg-white px-4 py-1.5 text-sm font-semibold text-dark shadow">
            View Details
          </span>
        </div>

        {/* Verified badge */}
        {property.isVerified && (
          <div className="absolute left-3 top-3 z-10">
            <Badge variant="verified" />
          </div>
        )}

        {/* Purpose badge */}
        <div className="absolute right-3 top-3 z-10">
          <Badge variant={path === "buy" ? "for-sale" : "for-rent"}>
            {path === "buy" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-3">
          <Link
            href={`/${path}/${property.externalID}`}
            className="line-clamp-2 text-base font-semibold text-dark transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {property.title}
          </Link>
        </h3>

        {/* Price row */}
        <div className="mb-4 flex items-center justify-between border-b border-stroke-stroke pb-4 dark:border-stroke-dark">
          <div>
            <span className="text-lg font-bold text-dark dark:text-white">
              AED {formattedPrice}
            </span>
            {property.rentFrequency && (
              <span className="ml-1 text-sm text-body-color dark:text-body-color-dark">
                /{property.rentFrequency}
              </span>
            )}
          </div>
          {property.agency?.logo?.url && (
            <Image
              src={property.agency.logo.url}
              height={32}
              width={32}
              alt={`${property.agency.name} logo`}
              className="rounded opacity-80"
            />
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-5 text-sm text-body-color dark:text-body-color-dark">
          <div className="flex items-center gap-1.5">
            <FaBed className="h-4 w-4 text-property-icon" aria-hidden="true" />
            <span>{property.rooms ?? "—"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaBath className="h-4 w-4 text-property-icon" aria-hidden="true" />
            <span>{property.baths ?? "—"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BsGrid1X2Fill className="h-3.5 w-3.5 text-property-icon" aria-hidden="true" />
            <span>{millify(safeArea)} sqft</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
