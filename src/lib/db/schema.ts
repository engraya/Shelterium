import {
  pgTable,
  bigserial,
  text,
  numeric,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const properties = pgTable(
  "properties",
  {
    id:               bigserial("id", { mode: "number" }).primaryKey(),
    externalId:       text("external_id").unique().notNull(),
    title:            text("title"),
    price:            numeric("price"),
    rentFrequency:    text("rent_frequency"),
    rooms:            integer("rooms"),
    baths:            integer("baths"),
    area:             numeric("area"),
    isVerified:       boolean("is_verified").default(false),
    coverPhoto:       jsonb("cover_photo"),
    agency:           jsonb("agency"),
    purpose:          text("purpose"),
    category:         jsonb("category"),
    description:      text("description"),
    completionStatus: text("completion_status"),
    referenceNumber:  text("reference_number"),
    contactName:      text("contact_name"),
    phoneNumber:      jsonb("phone_number"),
    state:            text("state"),
    product:          text("product"),
    type:             text("type"),
    furnishingStatus: text("furnishing_status"),
    amenities:        jsonb("amenities"),
    photos:           jsonb("photos"),
    location:         jsonb("location"),
  },
  (t) => ({
    purposeIdx: index("idx_properties_purpose").on(t.purpose),
    priceIdx:   index("idx_properties_price").on(t.price),
  }),
);

export type PropertyRow = typeof properties.$inferSelect;
