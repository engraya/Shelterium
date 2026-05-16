import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { dark, light } from "assets";
import { Check } from "lucide-react";

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-body-color-dark">
      <span className="mr-4 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-6 md:pt-16 lg:pt-16">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Why Choose Shelterium?"
                paragraph="Access thousands of verified properties available for buying, renting, and selling — ensuring you find the perfect match for your needs."
                mb="44px"
              />

              <div className="mb-12 max-w-[570px] lg:mb-0">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Saved Searches and Alerts" />
                    <List text="Contact Support" />
                    <List text="Property Comparison" />
                  </div>
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Personalized Recommendations" />
                    <List text="Verified Properties" />
                    <List text="Categories" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <Image
                  src={light}
                  alt="About Shelterium"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src={dark}
                  alt="About Shelterium"
                  fill
                  className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
