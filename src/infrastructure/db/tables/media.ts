import { serial, varchar, timestamp, date, pgTable } from "drizzle-orm/pg-core";

// CREATE TABLE "media" (
//     "id" BIGSERIAL,
//     "title" text NOT NULL,
//     "synopsis" text,
//     "url" text NOT NULL UNIQUE,
//     "image" text,
//     "created_at" timestamp NOT NULL,
//     "updated_at" timestamp NOT NULL,
//     "release_date" date NOT NULL,
//     "director_id" serial NOT NULL,
//     "type_id" serial NOT NULL,
//     PRIMARY KEY ("id")
// );
//

export const media = pgTable("media", {
	id: serial().primaryKey(),
	title: varchar().notNull(),
	sypnosis: varchar(),
	url: varchar().notNull().unique(),
	image: varchar(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	releaseDate: date("release_date").notNull(),
	// directorId: serial("director_id").notNull().references(()=> directors.id),
	// typeId: serial("type_id").notNull().references(()=> types.id),
});
