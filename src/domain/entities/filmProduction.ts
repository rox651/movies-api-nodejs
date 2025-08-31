import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { filmProduction } from "../../infrastructure/db/tables";

export type FilmProduction = InferSelectModel<typeof filmProduction>;
export type NewFilmProduction = InferInsertModel<typeof filmProduction>;
export type UpdateFilmProduction = Partial<NewFilmProduction>;
