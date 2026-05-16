import type { PropertyListParams } from "@/types/property";

export type FilterItem = {
  name: string;
  value: string;
};

export type FilterGroup = {
  items: FilterItem[];
  placeholder: string;
  queryName: keyof PropertyListParams;
};

export const filterData: FilterGroup[] = [
  {
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Purpose",
    queryName: "purpose",
  },
  {
    items: [
      { name: "Daily", value: "daily" },
      { name: "Weekly", value: "weekly" },
      { name: "Monthly", value: "monthly" },
      { name: "Yearly", value: "yearly" },
    ],
    placeholder: "Rent Frequency",
    queryName: "rentFrequency",
  },
  {
    items: [
      { name: "10,000", value: "10000" },
      { name: "20,000", value: "20000" },
      { name: "30,000", value: "30000" },
      { name: "40,000", value: "40000" },
      { name: "50,000", value: "50000" },
      { name: "60,000", value: "60000" },
      { name: "85,000", value: "85000" },
    ],
    placeholder: "Min Price (AED)",
    queryName: "minPrice",
  },
  {
    items: [
      { name: "50,000", value: "50000" },
      { name: "85,000", value: "85000" },
      { name: "110,000", value: "110000" },
      { name: "200,000", value: "200000" },
      { name: "500,000", value: "500000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Max Price (AED)",
    queryName: "maxPrice",
  },
  {
    items: [
      { name: "Lowest Price", value: "price-asc" },
      { name: "Highest Price", value: "price-desc" },
      { name: "Verified", value: "verified-score" },
      { name: "City Level Score", value: "city-level-score" },
    ],
    placeholder: "Sort",
    queryName: "sort",
  },
  {
    items: [
      { name: "1,000", value: "1000" },
      { name: "2,000", value: "2000" },
      { name: "5,000", value: "5000" },
      { name: "10,000", value: "10000" },
      { name: "20,000", value: "20000" },
    ],
    placeholder: "Max Area (sqft)",
    queryName: "areaMax",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5+", value: "5" },
    ],
    placeholder: "Rooms",
    queryName: "roomsMin",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5+", value: "5" },
    ],
    placeholder: "Baths",
    queryName: "bathsMin",
  },
  {
    items: [
      { name: "Furnished", value: "furnished" },
      { name: "Unfurnished", value: "unfurnished" },
    ],
    placeholder: "Furnish Type",
    queryName: "furnishingStatus",
  },
  {
    items: [
      { name: "Apartment", value: "4" },
      { name: "Townhouses", value: "16" },
      { name: "Villas", value: "3" },
      { name: "Penthouses", value: "18" },
      { name: "Hotel Apartments", value: "21" },
    ],
    placeholder: "Property Type",
    queryName: "categoryExternalID",
  },
];

export const getFilterValues = (filterValues: Partial<PropertyListParams>) => {
  const {
    purpose,
    rentFrequency,
    furnishingStatus,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    roomsMin,
    bathsMin,
    sort,
  } = filterValues;

  return [
    { name: "purpose", value: purpose },
    { name: "rentFrequency", value: rentFrequency },
    { name: "furnishingStatus", value: furnishingStatus },
    { name: "minPrice", value: minPrice },
    { name: "maxPrice", value: maxPrice },
    { name: "areaMax", value: areaMax },
    { name: "roomsMin", value: roomsMin },
    { name: "bathsMin", value: bathsMin },
    { name: "sort", value: sort },
    { name: "categoryExternalID", value: categoryExternalID },
  ].filter((entry) => entry.value !== undefined);
};
