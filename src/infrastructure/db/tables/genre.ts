import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { stateEnum } from "./enums";

export const genre = pgTable("genre", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	state: stateEnum("state").notNull(),
	description: varchar("description").notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});
