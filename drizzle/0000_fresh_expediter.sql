CREATE TYPE "public"."state" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE "director" (
	"id" serial PRIMARY KEY NOT NULL,
	"names" text NOT NULL,
	"lastnames" text,
	"state" "state" NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "film_production" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slogan" varchar NOT NULL,
	"description" varchar,
	"state" "state" NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"state" "state" NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"synopsis" text,
	"url" text NOT NULL,
	"image" text,
	"state" "state" NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"release_date" date NOT NULL,
	"director_id" serial NOT NULL,
	"type_id" serial NOT NULL,
	CONSTRAINT "media_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "media_film_production" (
	"id" serial PRIMARY KEY NOT NULL,
	"film_production_id" serial NOT NULL,
	"media_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_genre" (
	"id" serial PRIMARY KEY NOT NULL,
	"media_id" serial NOT NULL,
	"genre_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" varchar,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_director_id_director_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."director"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_type_id_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_film_production" ADD CONSTRAINT "media_film_production_film_production_id_film_production_id_fk" FOREIGN KEY ("film_production_id") REFERENCES "public"."film_production"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_film_production" ADD CONSTRAINT "media_film_production_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_genre" ADD CONSTRAINT "media_genre_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_genre" ADD CONSTRAINT "media_genre_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("id") ON DELETE no action ON UPDATE no action;