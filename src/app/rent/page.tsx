import Breadcrumb from "@/components/Common/Breadcrumb";
import PropertyGrid from "@/components/ui/PropertyGrid";
import { getForRentData } from "utils/dataFetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Properties | Shelterium",
  description: "Browse properties available for rent in Dubai and Abu Dhabi.",
};

export default async function RentPage() {
  const properties = await getForRentData();

  return (
    <>
      <Breadcrumb
        pageName="Rent Page"
        description="This Page Showcases Properties available for Renting"
      />
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <PropertyGrid properties={properties} path="rent" />
        </div>
      </section>
    </>
  );
}
