CREATE TABLE "properties" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"external_id" text NOT NULL,
	"title" text,
	"price" numeric,
	"rent_frequency" text,
	"rooms" integer,
	"baths" integer,
	"area" numeric,
	"is_verified" boolean DEFAULT false,
	"cover_photo" jsonb,
	"agency" jsonb,
	"purpose" text,
	"category" jsonb,
	"description" text,
	"completion_status" text,
	"reference_number" text,
	"contact_name" text,
	"phone_number" jsonb,
	"state" text,
	"product" text,
	"type" text,
	"furnishing_status" text,
	"amenities" jsonb,
	"photos" jsonb,
	"location" jsonb,
	CONSTRAINT "properties_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE INDEX "idx_properties_purpose" ON "properties" USING btree ("purpose");--> statement-breakpoint
CREATE INDEX "idx_properties_price" ON "properties" USING btree ("price");