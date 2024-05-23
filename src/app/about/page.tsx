import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Shelterium",
  description: "This is About Page for Shelterium",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About"
        description="Shelteruim is a cutting-edge real estate platform designed to simplify the process of buying, renting, and selling properties. Our mission is to provide a user-friendly, transparent, and secure environment where users can effortlessly navigate through thousands of verified listings, ensuring they find their perfect home."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
