import { serial, pgTable } from "drizzle-orm/pg-core";
import { media } from "./media";
import { genre } from "./genre";

export const mediaGenre = pgTable("media_genre", {
	id: serial("id").notNull().primaryKey(),
	mediaId: serial("media_id")
		.notNull()
		.references(() => media.id),
	genreId: serial("genre_id")
		.notNull()
		.references(() => genre.id),
});
