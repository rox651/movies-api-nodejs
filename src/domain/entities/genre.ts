import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { genre } from "../../infrastructure/db/tables";

export type Genre = InferSelectModel<typeof genre>;
export type NewGenre = InferInsertModel<typeof genre>;
