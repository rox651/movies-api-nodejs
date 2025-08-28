import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { genre } from "../../infrastructure/db/tables";

export const genreSelectSchema = createSelectSchema(genre);
export const createGenreSchema = createInsertSchema(genre);
