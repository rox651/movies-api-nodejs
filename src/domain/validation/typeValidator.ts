import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { typeTable } from "../../infrastructure/db/tables";

export const typeSelectSchema = createSelectSchema(typeTable);
export const createTypeSchema = createInsertSchema(typeTable);
