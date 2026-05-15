import { StaticImageData } from "next/image";
import { agency1, agency2, agency3, spacious, whiteChairs, holiday } from "assets";

type StaticPropertyItem = {
  id: number;
  title: string;
  rooms: number;
  baths: number;
  area: number;
  rentFrequency: string | null;
  isVerified: boolean;
  coverPhoto: StaticImageData;
  agencyPhoto: StaticImageData;
  price: number;
};

const propertyData: StaticPropertyItem[] = [
  {
    id: 1,
    title: "Build your 5 Star Resort on the Beach, Palm Jumeirah",
    rooms: 5,
    baths: 4,
    area: 33670.854400000004,
    rentFrequency: null,
    isVerified: true,
    coverPhoto: spacious,
    agencyPhoto: agency1,
    price: 23490,
  },
  {
    id: 2,
    title: "Full Burj Khalifa & Fountain Views I Direct Access to Dubai Mall",
    rooms: 5,
    baths: 4,
    area: 6456.854400000004,
    rentFrequency: null,
    isVerified: true,
    coverPhoto: whiteChairs,
    agencyPhoto: agency2,
    price: 63460,
  },
  {
    id: 3,
    title: "Furnished Studio in Lago Vista | Great Facilities",
    rooms: 5,
    baths: 4,
    area: 5630.854400000004,
    rentFrequency: null,
    isVerified: true,
    coverPhoto: holiday,
    agencyPhoto: agency3,
    price: 28840,
  },
];

export default propertyData;
