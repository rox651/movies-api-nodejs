import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { object, partial } from "valibot";
import { typeTable } from "../../infrastructure/db/tables";

export const typeSelectSchema = createSelectSchema(typeTable);
export const createTypeSchema = createInsertSchema(typeTable);
export const updateTypeSchema = object({
   ...partial(createTypeSchema).entries,
});
