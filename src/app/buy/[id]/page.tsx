import { getPropertyDetails } from "utils/dataFetch";
import { notFound } from "next/navigation";
import PropertyDetails from "@/components/Property/PropertyDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Details | Propellio AI",
  description: "Detailed information about a property available for purchase.",
};

export default async function BuyPropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPropertyDetails(params.id);
  if (!data) notFound();

  return <PropertyDetails property={data} purpose="buy" />;
}
