import { serial, pgTable } from "drizzle-orm/pg-core";
import { media } from "./media";
import { filmProduction } from "./film_production";

export const mediaFilmProduction = pgTable("media_film_production", {
	id: serial().notNull().primaryKey(),
	filmProductionId: serial("film_production_id")
		.notNull()
		.references(() => filmProduction.id),
	mediaId: serial("media_id")
		.notNull()
		.references(() => media.id),
});
