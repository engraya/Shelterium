import SingleProperty from "@/components/Buy/SingleProperty";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getForRentData } from "utils/dataFetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Page | Shelterium",
  description: "This is a Page for Rent",
  // other metadata
};

const RentPage = async () => {

  const propertyForRentData = await getForRentData();

  const path = "rent"

  return (
    <>
      <Breadcrumb
        pageName="Rent Page"
        description="This Page Showcases Properties available for Renting"
      />
      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {propertyForRentData?.map((property) => (
              <div
                key={property?.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleProperty property={property} path={path} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RentPage;
