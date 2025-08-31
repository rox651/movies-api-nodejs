import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { stateEnum } from "./enums";

export const genre = pgTable("genre", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	state: stateEnum("state").default("active").notNull(),
	description: varchar("description").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
