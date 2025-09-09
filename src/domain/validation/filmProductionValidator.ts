import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { object, partial } from "valibot";
import { filmProduction } from "../../infrastructure/db/tables";

export const filmProductionSelectSchema = createSelectSchema(filmProduction);
export const createFilmProductionSchema = createInsertSchema(filmProduction);
export const updateFilmProductionSchema = object({
   ...partial(createFilmProductionSchema).entries,
});
