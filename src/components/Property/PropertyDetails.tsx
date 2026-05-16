import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaBed, FaBath, FaPhone, FaWhatsapp, FaBuilding } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import millify from "millify";
import type { PropertyDetail } from "@/types/property";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { defaultImage } from "assets";

type PropertyDetailsProps = {
  property: PropertyDetail;
  purpose: "buy" | "rent";
};

export default function PropertyDetails({ property, purpose }: PropertyDetailsProps) {
  const {
    price,
    rentFrequency,
    rooms,
    completionStatus,
    referenceNumber,
    contactName,
    phoneNumber,
    state,
    product,
    title,
    baths,
    area,
    agency,
    isVerified,
    coverPhoto,
    description,
    type,
    furnishingStatus,
    amenities,
    photos,
  } = property;

  const safeArea = Number(area) || 0;
  const formattedPrice = millify(Number(price) || 0);
  const coverSrc = coverPhoto?.url ?? defaultImage;

  const specs = [
    { label: "Type", value: type },
    { label: "Purpose", value: purpose === "buy" ? "For Sale" : "For Rent" },
    { label: "State", value: state },
    { label: "Product", value: product },
    { label: "Completion", value: completionStatus },
    ...(purpose === "rent" && furnishingStatus
      ? [{ label: "Furnishing", value: furnishingStatus }]
      : []),
  ].filter((s) => s.value);

  const allAmenities = amenities?.flatMap((g) => g.amenities ?? []) ?? [];

  return (
    <section className="overflow-hidden pb-[120px] pt-[150px]">
      <div className="container">
        {/* Back link */}
        <Link
          href={`/${purpose}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
        >
          <FaArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to {purpose === "buy" ? "Buy" : "Rent"}
        </Link>

        {/* Hero image */}
        <div className="mb-4 overflow-hidden rounded-card">
          <div className="relative aspect-video w-full">
            <Image
              src={coverSrc}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Photo strip */}
        {photos && photos.length > 0 && (
          <div className="mb-10 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
            {photos.slice(0, 7).map((photo) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={photo.url}
                  alt="Property photo"
                  fill
                  className="object-cover transition-transform duration-200 hover:scale-105"
                  sizes="12vw"
                />
              </div>
            ))}
            {photos.length > 7 && (
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-black/60">
                <span className="text-sm font-semibold text-white">+{photos.length - 7}</span>
              </div>
            )}
          </div>
        )}

        {/* 2-column layout */}
        <div className="-mx-4 flex flex-wrap">
          {/* Left: main content */}
          <div className="w-full px-4 lg:w-8/12">
            {/* Title + badges */}
            <div className="mb-6 flex flex-wrap items-start gap-3">
              <div className="flex-1">
                <h1 className="text-heading-1 font-bold text-dark dark:text-white">{title}</h1>
              </div>
              <div className="flex shrink-0 gap-2">
                {isVerified && <Badge variant="verified" />}
                <Badge variant={purpose === "buy" ? "for-sale" : "for-rent"}>
                  {purpose === "buy" ? "For Sale" : "For Rent"}
                </Badge>
              </div>
            </div>

            {/* Price + specs row */}
            <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-stroke-stroke pb-8 dark:border-stroke-dark">
              <div>
                <p className="text-sm text-body-color dark:text-body-color-dark">Price</p>
                <p className="text-2xl font-bold text-dark dark:text-white">
                  AED {formattedPrice}
                  {rentFrequency && (
                    <span className="ml-1 text-base font-normal text-body-color dark:text-body-color-dark">
                      /{rentFrequency}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-body-color dark:text-body-color-dark">
                <div className="flex items-center gap-1.5">
                  <FaBed className="h-4 w-4 text-property-icon" aria-hidden="true" />
                  <span>{rooms ?? "—"} beds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaBath className="h-4 w-4 text-property-icon" aria-hidden="true" />
                  <span>{baths ?? "—"} baths</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BsGrid1X2Fill className="h-3.5 w-3.5 text-property-icon" aria-hidden="true" />
                  <span>{millify(safeArea)} sqft</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="mb-8">
                <h2 className="mb-3 text-heading-3 font-semibold text-dark dark:text-white">
                  Description
                </h2>
                <p className="leading-relaxed text-body-color dark:text-body-color-dark">
                  {description}
                </p>
              </div>
            )}

            {/* Specifications grid */}
            {specs.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-heading-3 font-semibold text-dark dark:text-white">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {specs.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-stroke-stroke bg-gray-light p-4 dark:border-stroke-dark dark:bg-dark"
                    >
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-body-color dark:text-body-color-dark">
                        {label}
                      </p>
                      <p className="text-sm font-semibold capitalize text-dark dark:text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {allAmenities.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-heading-3 font-semibold text-dark dark:text-white">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allAmenities.map((amenity) => (
                    <div
                      key={amenity.text}
                      className="flex items-center gap-2 rounded-lg border border-stroke-stroke px-3 py-2.5 text-sm text-dark dark:border-stroke-dark dark:text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {amenity.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agency + Reference */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stroke-stroke pt-6 dark:border-stroke-dark">
              {agency?.name && (
                <div className="flex items-center gap-3">
                  {agency.logo?.url && (
                    <Image
                      src={agency.logo.url}
                      width={40}
                      height={40}
                      alt={agency.name}
                      className="rounded-md"
                    />
                  )}
                  <div>
                    <p className="text-xs text-body-color dark:text-body-color-dark">Agency</p>
                    <p className="text-sm font-semibold text-dark dark:text-white">{agency.name}</p>
                  </div>
                </div>
              )}
              {referenceNumber && (
                <div>
                  <p className="text-xs text-body-color dark:text-body-color-dark">Reference</p>
                  <Badge variant="neutral" className="mt-1 font-mono text-xs">
                    {referenceNumber}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right: contact card */}
          <div className="w-full px-4 lg:w-4/12">
            <div className="sticky top-24 rounded-card border border-stroke-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-dark">
              {/* Agency branding */}
              {agency && (
                <div className="mb-6 flex items-center gap-3 border-b border-stroke-stroke pb-6 dark:border-stroke-dark">
                  {agency.logo?.url ? (
                    <Image
                      src={agency.logo.url}
                      width={44}
                      height={44}
                      alt={agency.name}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <FaBuilding className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-body-color dark:text-body-color-dark">Listed by</p>
                    <p className="font-semibold text-dark dark:text-white">{agency.name}</p>
                  </div>
                </div>
              )}

              {/* Agent */}
              {contactName && (
                <div className="mb-4">
                  <p className="mb-1 text-xs text-body-color dark:text-body-color-dark">Agent</p>
                  <p className="font-semibold text-dark dark:text-white">{contactName}</p>
                </div>
              )}

              {/* Price */}
              <div className="mb-6 rounded-lg bg-primary/5 p-4 dark:bg-primary/10">
                <p className="text-xs text-body-color dark:text-body-color-dark">Asking Price</p>
                <p className="text-xl font-bold text-primary">
                  AED {formattedPrice}
                  {rentFrequency && (
                    <span className="ml-1 text-sm font-normal text-body-color dark:text-body-color-dark">
                      /{rentFrequency}
                    </span>
                  )}
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                {phoneNumber?.mobile && (
                  <a href={`tel:${phoneNumber.mobile}`} className="w-full">
                    <Button variant="primary" className="w-full">
                      <FaPhone className="h-4 w-4" aria-hidden="true" />
                      Call Agent
                    </Button>
                  </a>
                )}
                {phoneNumber?.whatsapp && (
                  <a
                    href={`https://wa.me/${phoneNumber.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="secondary" className="w-full">
                      <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </Button>
                  </a>
                )}
              </div>

              {/* Verified note */}
              {isVerified && (
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-success">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.947 3.392 3.745 3.745 0 01-3.392.947A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.392-.947 3.745 3.745 0 01-.947-3.392A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.947-3.392 3.746 3.746 0 013.392-.947A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.392.947 3.746 3.746 0 01.947 3.392A3.745 3.745 0 0121 12z" />
                  </svg>
                  Verified listing
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
