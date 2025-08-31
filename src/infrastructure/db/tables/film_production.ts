import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { stateEnum } from "./enums";

export const filmProduction = pgTable("film_production", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	slogan: varchar("slogan").notNull(),
	description: varchar("description"),
	state: stateEnum("state").default("active").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
