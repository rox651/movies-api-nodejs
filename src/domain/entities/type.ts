import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { typeTable } from "../../infrastructure/db/tables";

export type Type = InferSelectModel<typeof typeTable>;
export type NewType = InferInsertModel<typeof typeTable>;
