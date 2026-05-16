import { Feature } from "@/types/feature";
import { Building2, Search, ShieldCheck, FileText, Star, Code2 } from "lucide-react";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Building2 className="h-9 w-9" aria-hidden="true" />,
    title: "Comprehensive Property Listings",
    paragraph:
      "Explore a diverse range of properties available to buy, rent, or sell across Dubai and Abu Dhabi.",
  },
  {
    id: 2,
    icon: <Search className="h-9 w-9" aria-hidden="true" />,
    title: "Advanced Search Filters",
    paragraph:
      "Filter by rooms, price, rent frequency, area, property type, and amenities to find exactly what you need.",
  },
  {
    id: 3,
    icon: <ShieldCheck className="h-9 w-9" aria-hidden="true" />,
    title: "Verified Listings",
    paragraph:
      "Every listing is verified for authenticity, giving you confidence in the properties you browse.",
  },
  {
    id: 4,
    icon: <FileText className="h-9 w-9" aria-hidden="true" />,
    title: "Detailed Property Descriptions",
    paragraph:
      "View complete property details including high-quality photos, descriptions, specs, and agency information.",
  },
  {
    id: 5,
    icon: <Star className="h-9 w-9" aria-hidden="true" />,
    title: "User Reviews and Ratings",
    paragraph:
      "Read testimonials and ratings from real users to make informed decisions about your next property.",
  },
  {
    id: 6,
    icon: <Code2 className="h-9 w-9" aria-hidden="true" />,
    title: "Free and Open-Source",
    paragraph:
      "Shelterium is free and open-source, ensuring accessibility and transparency for all users.",
  },
];

export default featuresData;
