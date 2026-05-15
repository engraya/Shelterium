import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { defaultImage } from "assets";
import millify from "millify";
import type { PropertyListItem } from "@/types/property";

type PropertyCardProps = {
  property: PropertyListItem;
  path: "buy" | "rent";
};

const PropertyCard = ({ property, path }: PropertyCardProps) => {
  const safeArea = Number(property.area) || 0;
  const coverSrc = property.coverPhoto?.url ?? defaultImage;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
      <Link
        href={`/${path}/${property.id}`}
        className="relative block aspect-[37/22] w-full"
        tabIndex={-1}
        aria-hidden="true"
      >
        {property.isVerified && (
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-green-400 px-2 py-1 text-sm font-semibold capitalize text-white">
            <MdVerifiedUser size="1rem" />
          </span>
        )}
        <Image
          src={coverSrc}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="p-6 sm:p-8 md:px-6 md:py-6 lg:p-6 xl:px-5 xl:py-6 2xl:p-6">
        <h3>
          <Link
            href={`/${path}/${property.id}`}
            className="mb-4 block text-lg font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-xl line-clamp-2"
          >
            {property.title}
          </Link>
        </h3>

        <div className="mb-4 flex justify-between border-b border-body-color border-opacity-10 pb-4 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          AED {property.price}
          {property.rentFrequency && `/${property.rentFrequency}`}/ month
          {property.agency?.logo?.url && (
            <Image
              src={property.agency.logo.url}
              height={50}
              width={50}
              alt={`${property.agency.name} logo`}
              className="rounded"
            />
          )}
        </div>

        <div className="flex items-center justify-around">
          <div className="flex items-center dark:border-white dark:border-opacity-10">
            <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
                <FaBed size="1.5rem" color="#075970" />
                <div className="mt-1 flex justify-center text-sm text-body-color">
                  {property.rooms}
                </div>
              </div>
            </div>
            <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
                <FaBath size="1.5rem" color="#075970" />
                <div className="mt-1 flex justify-center text-sm text-body-color">
                  {property.baths}
                </div>
              </div>
            </div>
            <div className="mr-4">
              <div className="inline-block">
                <BsGrid1X2Fill size="1.5rem" color="#075970" />
                <div className="mt-1 flex justify-center text-sm text-body-color">
                  {millify(safeArea)} sqft
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
