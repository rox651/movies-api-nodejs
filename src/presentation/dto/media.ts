import type { Media, NewMedia } from "../../domain/entities/Media";
import type { PaginationParamsDTO } from "./pagination";
import { object, optional, string, number } from "valibot";
import { paginationSchema } from "./pagination";

type MediaParams = Partial<Pick<Media, "title" | "releaseDate" | "typeId">>;

export interface MediaRequestParamsDTO extends PaginationParamsDTO, MediaParams {
   genreIds?: string;
   filmProductionIds?: string;
}

export interface CreateMediaDTO extends Omit<NewMedia, "id" | "createdAt" | "updatedAt"> {
   genreIds: number[];
   filmProductionIds: number[];
}

// Valibot schema for list request params (presentation-level)
export const mediaRequestParamsSchema = object({
   ...paginationSchema.entries,
   title: optional(string()),
   releaseDate: optional(string()),
   typeId: optional(number()),
   genreIds: optional(string()),
   filmProductionIds: optional(string()),
});
