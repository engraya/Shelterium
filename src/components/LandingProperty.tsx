import Image from "next/image";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { defaultImage } from "assets";
import millify from "millify";
function LandingProperty({ item }) {
  return (
    <>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <div
          className="relative block aspect-[37/22] w-full"
        >
          {item?.isVerified &&<span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-green-400 px-2 py-1 text-sm font-semibold capitalize text-white">
          <MdVerifiedUser size={"1rem"} /> 
          </span>}
     
          <Image src={item?.coverPhoto || defaultImage} alt="image" fill />
        </div>
        <div className="p-6 sm:p-8 md:px-6 md:py-6 lg:p-6 xl:px-5 xl:py-6 2xl:p-6">
          <h3>
            <div
              className="mb-4 block text-md font-bold text-black hover:text-primary dark:text-slate-100 dark:hover:text-primary sm:text-xl"
            >
           {item?.title.length > 30 ? item?.title.substring(0, 30) + '...' : item?.title}
            </div>
          </h3>
          <div className="mb-4 flex justify-between border-b border-gray-800 dark:text-slate-100 italic border-opacity-10 pb-4 text-base font-medium text-gray-800 dark:border-white dark:border-opacity-10">
          AED {item?.price}{item?.rentFrequency && `/${item?.rentFrequency}`} / month
            <div>
              <Image src={item?.agencyPhoto} height={50} width={50} alt="Agency Photo" className="rounded"/>
          </div>
          </div>
    
          <div className="flex items-center justify-around">
            <div className="flex items-center dark:border-white dark:border-opacity-10">
              <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <FaBed size={"1.5rem"} color="#52c7e7"/>
              </h4>
              <div className="text-sm flex justify-center items-center text-body-color">{item?.rooms}</div>
            </div>
              </div>
              <div className="mr-4 border-r border-body-color border-opacity-10 pr-10">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <FaBath size={"1.5rem"} color="#52c7e7"/>
              </h4>
              <div className="text-sm justify-center items-center flex text-body-color">{item?.baths}</div>
            </div>
              </div>
              <div className="mr-4 ">
              <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              <BsGrid1X2Fill size={"1.5rem"} color="#52c7e7"/>
              </h4>
              <div className="text-sm justify-center items-center flex text-body-color"> {millify(item?.area)} sqft</div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingProperty
