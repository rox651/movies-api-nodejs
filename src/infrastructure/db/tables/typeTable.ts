import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

export const typeTable = pgTable("type", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: varchar("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
