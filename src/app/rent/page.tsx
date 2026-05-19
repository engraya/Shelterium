import Breadcrumb from "@/components/Common/Breadcrumb";
import PropertyBrowser from "@/components/ui/PropertyBrowser";
import { getForRentData } from "utils/dataFetch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for Rent",
  description: "Discover rental properties across Dubai and Abu Dhabi.",
};

export default async function RentPage() {
  const properties = await getForRentData();

  return (
    <>
      <Breadcrumb
        pageName="Properties for Rent"
        description="Discover rental properties across Dubai and Abu Dhabi."
      />
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <PropertyBrowser initialProperties={properties} purpose="rent" />
        </div>
      </section>
    </>
  );
}
