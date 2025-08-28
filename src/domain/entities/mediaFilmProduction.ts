import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { mediaFilmProduction } from "../../infrastructure/db/tables";

export type MediaFilmProduction = InferSelectModel<typeof mediaFilmProduction>;
export type NewMediaFilmProduction = InferInsertModel<
	typeof mediaFilmProduction
>;
