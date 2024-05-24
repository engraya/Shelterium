// import SingleProperty from "@/components/Buy/SingleProperty";
// import Breadcrumb from "@/components/Common/Breadcrumb";
// import { getForSaleData } from "utils/dataFetch";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Buy | Buy Page for Shelterium",
//   description: "This is a Page for buying",
//   // other metadata
// };

// const Blog = async () => {

//   const propertyForSaleData = await getForSaleData();

//   const path = "buy"

//   return (
//     <>
//       <Breadcrumb
//         pageName="Buy Page"
//         description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
//       />
//       <section className="pb-[120px] pt-[80px]">
//         <div className="container">
//           <div className="-mx-4 flex flex-wrap justify-center">
//             {propertyForSaleData?.map((property) => (
//               <div
//                 key={property?.id}
//                 className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
//               >
//                <SingleProperty property={property} path={path}/>
//               </div>
//             ))}
//           </div>

//           {/* <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
//             <div className="w-full px-4">
//               <ul className="flex items-center justify-center pt-8">
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     Prev
//                   </a>
//                 </li>
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     1
//                   </a>
//                 </li>
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     2
//                   </a>
//                 </li>
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     3
//                   </a>
//                 </li>
//                 <li className="mx-1">
//                   <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
//                     ...
//                   </span>
//                 </li>
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     12
//                   </a>
//                 </li>
//                 <li className="mx-1">
//                   <a
//                     href="#0"
//                     className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//                   >
//                     Next
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div> */}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Blog;
