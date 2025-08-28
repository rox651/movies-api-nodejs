import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { array, number, object } from "valibot";
import { media } from "../../infrastructure/db/tables/media";

export const mediaSelectSchema = createSelectSchema(media);

const baseCreateMediaSchema = createInsertSchema(media);
const genreIdsSchema = object({ genreIds: array(number()) });

export const createMediaSchema = object({
	...baseCreateMediaSchema.entries,
	...genreIdsSchema.entries,
});
