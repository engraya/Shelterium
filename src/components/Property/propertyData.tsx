import { Property } from "@/types/property";
import { agency1, agency2, agency3, spacious, whiteChairs, holiday } from "assets";

const propertyData: Property[] = [
  {
    id: 1,
    title: "Build your 5 Star Resort on the Beach, Palm Jumeirah",
    rooms : 5,
    baths : 4,
    area : 33670.854400000004,
    rentFrequency : null,
    isVerified : true,
    coverPhoto : spacious,
    agencyPhoto : agency1,
    price : 23490

  },
  {
    id: 2,
    title: "Full Burj Khalifa & Fountain Views I Direct Access to Dubai mall",
    rooms : 5,
    baths : 4,
    area : 6456.854400000004,
    rentFrequency : null,
    isVerified : true,
    coverPhoto : whiteChairs,
    agencyPhoto : agency2,
    price : 63460
  },
  {
    id: 3,
    title: "Furnished Studio in Lago Vista | Great facilities",
    rooms : 5,
    baths : 4,
    area : 5630.854400000004,
    rentFrequency : null,
    isVerified : true,
    coverPhoto : holiday,
    agencyPhoto : agency3,
    price : 28840
  },
];
export default propertyData;
