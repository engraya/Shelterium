import TagButton from "@/components/Buy/TagButton";
import Image from "next/image";
import { getPropertyDetails } from "utils/dataFetch";
import { Metadata } from "next";
import { MdVerifiedUser } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import millify from "millify";
import PropertyContactBox from "@/components/PropertyContactBox/PropertyContactBox";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Property Details Page",
  description: "This is the Details Page for a Property",
  // other metadata
};

const PropertyDetailsPage = async ({ params } : {
  params : {
    id : string
  }
}) => {
  const { id } = params
  const data = await getPropertyDetails(id)
  const {price, rentFrequency, rooms, completionStatus, referenceNumber, contactName,phoneNumber, state, product, title, baths, area, agency, isVerified, coverPhoto, description, type, purpose, furnishingStatus, amenities, photos} = data
  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[150px]">
        <div className="container">
          <Link href="/rent">
          <button type="button" className="flex justify-center items-center gap-x-2 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
        <FaArrowLeft />
          Back
          </button>
          </Link>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {title}
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        {isVerified && <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <MdVerifiedUser size={"2rem"} /> 
                        </div>}
                      </div>
                      <div className="w-full">
                        <span className="mb-1 text-base font-medium text-body-color">
                        AED {price}{rentFrequency && `/${rentFrequency}`}<span>/ month</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                        <FaBed size={"1.5rem"} color="#075970"/>
                        </span>
                        {rooms}
                      </p>
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                        <FaBath size={"1.5rem"} color="#075970"/>
                        </span>
                        {baths}
                      </p>
                      <p className="flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                        <BsGrid1X2Fill size={"1.5rem"} color="#075970"/>
                        </span>
                        {millify(area)} sqft
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    {isVerified && <div
                      className="inline-flex items-center justify-center rounded-full bg-green-400 px-4 py-2 text-sm font-semibold text-white"
                    >
                      <MdVerified size="1.4rem"/>
                      verified
                    </div>}
           
                  </div>
                </div>
                <div>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="grid gap-4">
                      <div>
                        <Image className="h-auto w-full rounded-lg" src={coverPhoto?.url} height={500} width={500} alt="coverPhoto" />
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {photos?.map((photo) => (
                          <div key={photo?.id}>
                          <Image className="h-auto max-w-full rounded-lg" src={photo?.url} width={300} height={300} alt="property-photo" />
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                    <p className="text-center text-base font-medium italic text-body-color">
                      {description}
                    </p>
                    <span className="absolute left-0 top-0 z-[-1]">
                      <svg
                        width="132"
                        height="109"
                        viewBox="0 0 132 109"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M33.0354 90.11C19.9851 102.723 -3.75916 101.834 -14 99.8125V-15H132C131.456 -12.4396 127.759 -2.95278 117.318 14.5117C104.268 36.3422 78.7114 31.8952 63.2141 41.1934C47.7169 50.4916 49.3482 74.3435 33.0354 90.11Z"
                          fill="url(#paint0_linear_111:606)"
                        />
                        <path
                          opacity="0.5"
                          d="M33.3654 85.0768C24.1476 98.7862 1.19876 106.079 -9.12343 108.011L-38.876 22.9988L100.816 -25.8905C100.959 -23.8126 99.8798 -15.5499 94.4164 0.87754C87.5871 21.4119 61.9822 26.677 49.5641 38.7512C37.146 50.8253 44.8877 67.9401 33.3654 85.0768Z"
                          fill="url(#paint1_linear_111:606)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_111:606"
                            x1="94.7523"
                            y1="82.0246"
                            x2="8.40951"
                            y2="52.0609"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_111:606"
                            x1="90.3206"
                            y1="58.4236"
                            x2="1.16149"
                            y2="50.8365"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.06" />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span className="absolute bottom-0 right-0 z-[-1]">
                      <svg
                        width="53"
                        height="30"
                        viewBox="0 0 53 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          opacity="0.8"
                          cx="37.5"
                          cy="37.5"
                          r="37.5"
                          fill="#4A6CF7"
                        />
                        <mask
                          id="mask0_111:596"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="75"
                          height="75"
                        >
                          <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="#4A6CF7"
                          />
                        </mask>
                        <g mask="url(#mask0_111:596)">
                          <circle
                            opacity="0.8"
                            cx="37.5"
                            cy="37.5"
                            r="37.5"
                            fill="url(#paint0_radial_111:596)"
                          />
                          <g opacity="0.8" filter="url(#filter0_f_111:596)">
                            <circle
                              cx="40.8089"
                              cy="19.853"
                              r="15.4412"
                              fill="white"
                            />
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_f_111:596"
                            x="4.36768"
                            y="-16.5881"
                            width="72.8823"
                            height="72.8823"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="10.5"
                              result="effect1_foregroundBlur_111:596"
                            />
                          </filter>
                          <radialGradient
                            id="paint0_radial_111:596"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(37.5 37.5) rotate(90) scale(40.2574)"
                          >
                            <stop stopOpacity="0.47" />
                            <stop offset="1" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </span>
                  </div>
                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-medium text-body-color">
                        Agency
                      </h4>
                      <div className="flex items-center">
                        <TagButton text={agency?.name} />
                      </div>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Reference Number :
                      </h5>
                      <div className="flex items-center sm:justify-end">
                      <TagButton text={referenceNumber} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b text-center border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  More About Property
                </h3>
                <ul className="px-8 py-6">
                  <li className="flex flex-col mb-4">
                  <div className="flex justify-between items-center">
                  <div className="text-base font-medium text-body-color hover:text-primary">
                    Type
                  </div>
                  <div>
                    {type}
                  </div>
                </div>
                  </li>
                  <li className="flex flex-col mb-4">
                  <div className="flex justify-between items-center">
                  <div className="text-base font-medium text-body-color hover:text-primary">
                    Purpose
                  </div>
                  <div>
                    {purpose}
                  </div>
                </div>
                  </li>
                  <li className="flex flex-col mb-4">
                  <div className="flex justify-between items-center">
                  <div className="text-base font-medium text-body-color hover:text-primary">
                    State
                  </div>
                  <div>
                    {state}
                  </div>
                </div>
                  </li>
                  <li className="flex flex-col mb-4">
                  <div className="flex justify-between items-center">
                  <div className="text-base font-medium text-body-color hover:text-primary">
                    Product
                  </div>
                  <div>
                    {product}
                  </div>
                </div>
                  </li>
                  <li className="flex flex-col mb-4">
                  <div className="flex justify-between items-center">
                  <div className="text-base font-medium text-body-color hover:text-primary">
                    Completion Status
                  </div>
                  <div>
                    {completionStatus}
                  </div>
                </div>
                  </li>
                </ul>
              </div>
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b text-center border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Amenities
                </h3>
                <div className="flex flex-wrap justify-center items-center px-8 py-6">
                  {amenities?.map((item) => (
                    item?.amenities?.map((amenity) => (
                      <TagButton text={amenity?.text} />
                    ))
                  ))}
                </div>
              </div>

              <PropertyContactBox contactName={contactName} phoneNumber={phoneNumber}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDetailsPage;
