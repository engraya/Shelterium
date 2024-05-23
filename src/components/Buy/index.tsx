import SectionTitle from "../Common/SectionTitle";
import LandingProperty from "../LandingProperty";
import propertyData from "../Property/propertyData";

const LatestProperties = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-10 md:py-10 lg:py-12"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Properties"
          paragraph=""
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {propertyData.map((item) => (
            <div key={item.id} className="w-full">
              <LandingProperty item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProperties;
