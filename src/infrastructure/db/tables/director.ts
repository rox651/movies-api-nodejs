import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { stateEnum } from "./enums";

export const director = pgTable("director", {
	id: serial("id").primaryKey(),
	names: text("names").notNull(),
	lastnames: text("lastnames"),
	state: stateEnum("state").notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});
