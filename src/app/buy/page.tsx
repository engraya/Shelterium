import Breadcrumb from "@/components/Common/Breadcrumb";
import PropertyBrowser from "@/components/ui/PropertyBrowser";
import { getForSaleData } from "utils/dataFetch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description: "Browse verified properties available for purchase across Dubai and Abu Dhabi.",
};

export default async function BuyPage() {
  const properties = await getForSaleData();

  return (
    <>
      <Breadcrumb
        pageName="Properties for Sale"
        description="Explore verified listings for sale across Dubai and Abu Dhabi."
      />
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <PropertyBrowser initialProperties={properties} purpose="buy" />
        </div>
      </section>
    </>
  );
}
