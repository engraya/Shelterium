export type PhotoItem = {
  id: number;
  url: string;
  title?: string;
  orderIndex?: number;
};

export type AgencyLogo = {
  url: string;
};

export type Agency = {
  id: number;
  name: string;
  logo: AgencyLogo;
  tier?: string;
  slug?: string;
};

export type Amenity = {
  text: string;
};

export type AmenityGroup = {
  amenities: Amenity[];
  text?: string;
};

export type PhoneNumber = {
  mobile: string | null;
  whatsapp: string | null;
  phone: string | null;
};

export type PropertyCategory = {
  id: number;
  nameSingular: string;
  namePlural?: string;
  slug?: string;
};

export type PropertyListItem = {
  id: number;
  externalID: string;
  title: string;
  price: number;
  rentFrequency: string | null;
  rooms: number;
  baths: number;
  area: number;
  isVerified: boolean;
  coverPhoto: PhotoItem | null;
  agency: Agency;
  purpose: string;
  category: PropertyCategory[];
  geography?: {
    lat: number;
    lng: number;
  };
  location?: Array<{ name: string }>;
};

export type PropertyDetail = PropertyListItem & {
  description: string;
  completionStatus: string;
  referenceNumber: string;
  contactName: string;
  phoneNumber: PhoneNumber;
  state: string;
  product: string;
  type: string;
  furnishingStatus: string | null;
  amenities: AmenityGroup[];
  photos: PhotoItem[];
};

export type PropertyListParams = {
  purpose: "for-rent" | "for-sale";
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  rentFrequency?: string;
  furnishingStatus?: string;
  roomsMin?: number;
  bathsMin?: number;
  areaMax?: number;
  categoryExternalID?: number;
  hitsPerPage?: number;
};
