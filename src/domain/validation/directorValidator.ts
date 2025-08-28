import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { director } from "../../infrastructure/db/tables";

export const directorSelectSchema = createSelectSchema(director);
export const createDirectorSchema = createInsertSchema(director);
