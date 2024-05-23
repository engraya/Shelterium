import Image from "next/image";
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { defaultImage } from "assets";
import millify from "millify";
const SingleProperty = ({ property, path }) => { 


  return (
    <>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={`/${path}/${property?.id}`}
          className="relative block aspect-[37/22] w-full"
        >
          {property?.isVerified && <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-green-400 px-2 py-1 text-sm font-semibold capitalize text-white">
          <MdVerifiedUser size={"1rem"} /> 
          </span>}
     
          <Image src={property?.coverPhoto.url || defaultImage} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-6 lg:p-6 xl:px-5 xl:py-6 2xl:p-6">
          <h3>
            <Link
            href={`/${path}/${property?.id}`}
              className="mb-4 block text-lg font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-xl"
            >
           {property?.title.length > 30 ? property?.title.substring(0, 30) + '...' : property?.title}
            </Link>
          </h3>
          <div className="mb-4 flex justify-between border-b border-body-color border-opacity-10 pb-4 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          AED {property?.price}{property?.rentFrequency && `/${property?.rentFrequency}`} / month
            <div>
              <Image src={property?.agency?.logo?.url} height={50} width={50} alt="Agency Photo" className="rounded"/>
          </div>
          </div>
    
          <div className="flex items-center justify-around">
            <div className="flex items-center dark:border-white dark:border-opacity-10">
              <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <FaBed size={"1.5rem"} color="#075970"/>
              </h4>
              <div className="text-sm flex justify-center items-center text-body-color">{property?.rooms}</div>
            </div>
              </div>
              <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <FaBath size={"1.5rem"} color="#075970"/>
              </h4>
              <div className="text-sm justify-center items-center flex text-body-color">{property?.baths}</div>
            </div>
              </div>
              <div className="mr-4 ">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <BsGrid1X2Fill size={"1.5rem"} color="#075970"/>
              </h4>
              <div className="text-sm justify-center items-center flex text-body-color"> {millify(property?.area)} sqft</div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProperty;
