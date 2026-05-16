import PropertyCard from "@/components/ui/PropertyCard";
import type { PropertyListItem } from "@/types/property";

const SingleProperty = ({ property, path }: { property: PropertyListItem; path: "buy" | "rent" }) => {
  return <PropertyCard property={property} path={path} />;
};

export default SingleProperty;
