import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { mediaGenre } from "../../infrastructure/db/tables";

export type MediaGenre = InferSelectModel<typeof mediaGenre>;
export type NewMediaGenre = InferInsertModel<typeof mediaGenre>;
