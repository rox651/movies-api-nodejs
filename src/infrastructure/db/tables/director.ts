import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { stateEnum } from "./enums";

export const director = pgTable("director", {
	id: serial("id").primaryKey(),
	names: text("names").notNull(),
	lastnames: text("lastnames"),
	state: stateEnum("state").default("active").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
