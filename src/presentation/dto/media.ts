import type { Media, NewMedia } from "../../domain/entities/media";
import type { PaginationParamsDTO } from "./pagination";

type MediaParams = Partial<Pick<Media, "title" | "releaseDate" | "typeId">>;

export interface MediaRequestParamsDTO
	extends PaginationParamsDTO,
		MediaParams {
	genreIds?: "string";
	filmProductionIds?: "string";
}

export interface CreateMediaDTO
	extends Omit<NewMedia, "id" | "createdAt" | "updatedAt"> {
	genreIds: number[];
	filmProductionIds: number[];
}
