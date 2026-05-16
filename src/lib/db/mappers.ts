import type { PropertyListItem, PropertyDetail } from "@/types/property";
import type { PropertyRow } from "./schema";

export function toListItem(r: PropertyRow): PropertyListItem {
  return {
    id:            Number(r.id),
    externalID:    r.externalId,
    title:         r.title ?? "",
    price:         Number(r.price ?? 0),
    rentFrequency: r.rentFrequency ?? null,
    rooms:         r.rooms ?? 0,
    baths:         r.baths ?? 0,
    area:          Number(r.area ?? 0),
    isVerified:    r.isVerified ?? false,
    coverPhoto:    r.coverPhoto as PropertyListItem["coverPhoto"],
    agency:        r.agency as PropertyListItem["agency"],
    purpose:       r.purpose ?? "",
    category:      (r.category as PropertyListItem["category"]) ?? [],
    location:      r.location as PropertyListItem["location"],
  };
}

export function toDetail(r: PropertyRow): PropertyDetail {
  return {
    ...toListItem(r),
    description:      r.description ?? "",
    completionStatus: r.completionStatus ?? "",
    referenceNumber:  r.referenceNumber ?? "",
    contactName:      r.contactName ?? "",
    phoneNumber:      r.phoneNumber as PropertyDetail["phoneNumber"],
    state:            r.state ?? "",
    product:          r.product ?? "",
    type:             r.type ?? "",
    furnishingStatus: r.furnishingStatus ?? null,
    amenities:        (r.amenities as PropertyDetail["amenities"]) ?? [],
    photos:           (r.photos as PropertyDetail["photos"]) ?? [],
  };
}
