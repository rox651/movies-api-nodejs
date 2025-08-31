ALTER TABLE "director" ALTER COLUMN "state" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "director" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "director" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "film_production" ALTER COLUMN "state" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "film_production" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "film_production" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "genre" ALTER COLUMN "state" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "genre" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "genre" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "state" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "release_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "type" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "type" ALTER COLUMN "updated_at" SET DEFAULT now();