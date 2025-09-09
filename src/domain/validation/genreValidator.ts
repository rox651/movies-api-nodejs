import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { object, partial } from "valibot";
import { genre } from "../../infrastructure/db/tables";

export const genreSelectSchema = createSelectSchema(genre);
export const createGenreSchema = createInsertSchema(genre);
export const updateGenreSchema = object({
   ...partial(createGenreSchema).entries,
});
