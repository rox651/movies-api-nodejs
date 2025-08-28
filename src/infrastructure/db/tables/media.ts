import { serial, text, timestamp, date, pgTable } from "drizzle-orm/pg-core";
import { director } from "./director";
import { typeTable } from "./typeTable";
import { stateEnum } from "./enums";

export const media = pgTable("media", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	synopsis: text("synopsis"),
	url: text("url").notNull().unique(),
	image: text("image"),
	state: stateEnum("state").notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	releaseDate: date("release_date").notNull(),
	directorId: serial("director_id")
		.notNull()
		.references(() => director.id),
	typeId: serial("type_id")
		.notNull()
		.references(() => typeTable.id),
});
