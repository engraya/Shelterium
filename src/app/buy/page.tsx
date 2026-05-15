import Breadcrumb from "@/components/Common/Breadcrumb";
import PropertyGrid from "@/components/ui/PropertyGrid";
import { getForSaleData } from "utils/dataFetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Properties | Shelterium",
  description: "Browse properties available for purchase in Dubai and Abu Dhabi.",
};

export default async function BuyPage() {
  const properties = await getForSaleData();

  return (
    <>
      <Breadcrumb
        pageName="Buy Page"
        description="This Page Showcases Properties available for Buying"
      />
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <PropertyGrid properties={properties} path="buy" />
        </div>
      </section>
    </>
  );
}
