import type { PaginationDTO } from "./PaginationDTO";

export interface MediaFilterDTO {
	title?: string;
	genreIds: number[];
	directorId?: number;
	typeId?: number;
	release?: Date;
	state?: "active" | "inactive";
}

export interface MediaQueryDTO extends MediaFilterDTO {
	pagination: PaginationDTO;
}
