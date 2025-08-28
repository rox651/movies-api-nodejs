import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { filmProduction } from "../../infrastructure/db/tables";

export const filmProductionSelectSchema = createSelectSchema(filmProduction);
export const createFilmProductionSchema = createInsertSchema(filmProduction);
