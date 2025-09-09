import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { array, number, object, optional, partial, string } from "valibot";
import { media } from "../../infrastructure/db/tables/media";

export const mediaSelectSchema = createSelectSchema(media);

const baseCreateMediaSchema = createInsertSchema(media);
const genreIdsSchema = object({ genreIds: array(number()) });
const filmProductionIdsSchema = object({ filmProductionIds: array(number()) });

export const createMediaSchema = object({
   ...baseCreateMediaSchema.entries,
   ...genreIdsSchema.entries,
   ...filmProductionIdsSchema.entries,
});

export const updateMediaSchema = object({
   ...partial(baseCreateMediaSchema).entries,
   ...partial(genreIdsSchema).entries,
   ...partial(filmProductionIdsSchema).entries,
});

const listMediaFilterBase = object({
   title: mediaSelectSchema.entries.title,
   releaseDate: mediaSelectSchema.entries.releaseDate,
   typeId: mediaSelectSchema.entries.typeId,
});

export const listMediaFilterSchema = object({
   ...partial(listMediaFilterBase).entries,
   genreIds: optional(string()),
   filmProductionIds: optional(string()),
});
