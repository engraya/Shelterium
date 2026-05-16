import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, LayoutGrid, Eye, MapPin } from "lucide-react";
import { defaultImage } from "assets";
import millify from "millify";
import type { PropertyListItem } from "@/types/property";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  property: PropertyListItem;
  path: "buy" | "rent";
  variant?: "grid" | "list";
};

function LocationLine({ location }: { location?: Array<{ name: string }> }) {
  if (!location || location.length === 0) return null;
  const label = location.slice(-2).map((l) => l.name).join(", ");
  return (
    <p className="mb-2 flex items-center gap-1.5 truncate text-xs text-body-color dark:text-body-color-dark">
      <MapPin className="h-3 w-3 shrink-0 text-property-icon" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </p>
  );
}

const PropertyCard = ({ property, path, variant = "grid" }: PropertyCardProps) => {
  const safeArea = Number(property.area) || 0;
  const coverSrc = property.coverPhoto?.url ?? defaultImage;
  const formattedPrice = millify(Number(property.price) || 0);
  const href = `/${path}/${property.externalID}`;

  /* ══════════ LIST VARIANT ══════════ */
  if (variant === "list") {
    return (
      <article className="group flex overflow-hidden rounded-card bg-white shadow-one transition-shadow duration-200 hover:shadow-card dark:bg-dark">
        {/* Image — fixed 1/3 width */}
        <Link
          href={href}
          className="relative w-1/3 shrink-0 overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={coverSrc}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Eye className="h-6 w-6 text-white" />
          </div>
          {property.isVerified && (
            <div className="absolute left-3 top-3 z-10">
              <Badge variant="verified" />
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3>
                <Link
                  href={href}
                  className="line-clamp-2 text-base font-semibold text-dark transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  {property.title}
                </Link>
              </h3>
              <Badge variant={path === "buy" ? "for-sale" : "for-rent"} className="shrink-0">
                {path === "buy" ? "For Sale" : "For Rent"}
              </Badge>
            </div>

            <LocationLine location={property.location} />

            <div className="mb-3">
              <span className="text-xl font-bold text-dark dark:text-white">
                AED {formattedPrice}
              </span>
              {property.rentFrequency && (
                <span className="ml-1 text-sm text-body-color dark:text-body-color-dark">
                  /{property.rentFrequency}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-stroke-stroke pt-3 dark:border-stroke-dark">
            <div className="flex items-center gap-5 text-sm text-body-color dark:text-body-color-dark">
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-property-icon" aria-hidden="true" />
                <span>{property.rooms ?? "—"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-property-icon" aria-hidden="true" />
                <span>{property.baths ?? "—"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5 text-property-icon" aria-hidden="true" />
                <span>{millify(safeArea)} sqft</span>
              </div>
            </div>
            {property.agency?.logo?.url && (
              <Image
                src={property.agency.logo.url}
                height={28}
                width={28}
                alt={`${property.agency.name} logo`}
                className="rounded opacity-70"
              />
            )}
          </div>
        </div>
      </article>
    );
  }

  /* ══════════ GRID VARIANT ══════════ */
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-one transition-shadow duration-200 hover:shadow-card dark:bg-dark">
      {/* Image */}
      <Link
        href={href}
        className="relative block aspect-[37/22] w-full overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={coverSrc}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 575px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-pill bg-white px-4 py-1.5 text-sm font-semibold text-dark shadow">
            <Eye className="h-4 w-4" aria-hidden="true" />
            View Details
          </span>
        </div>

        {/* Badges */}
        {property.isVerified && (
          <div className="absolute left-3 top-3 z-10">
            <Badge variant="verified" />
          </div>
        )}
        <div className="absolute right-3 top-3 z-10">
          <Badge variant={path === "buy" ? "for-sale" : "for-rent"}>
            {path === "buy" ? "For Sale" : "For Rent"}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="mb-1">
          <Link
            href={href}
            className="line-clamp-2 text-base font-semibold text-dark transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {property.title}
          </Link>
        </h3>

        {/* Location */}
        <LocationLine location={property.location} />

        {/* Price + agency logo */}
        <div className="mb-4 mt-auto flex items-center justify-between border-b border-stroke-stroke pb-4 pt-2 dark:border-stroke-dark">
          <div>
            <span className="text-xl font-bold text-dark dark:text-white">
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
              height={28}
              width={28}
              alt={`${property.agency.name} logo`}
              className="rounded opacity-70"
            />
          )}
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-5 text-sm text-body-color dark:text-body-color-dark">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-property-icon" aria-hidden="true" />
            <span>{property.rooms ?? "—"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-property-icon" aria-hidden="true" />
            <span>{property.baths ?? "—"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5 text-property-icon" aria-hidden="true" />
            <span>{millify(safeArea)} sqft</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
