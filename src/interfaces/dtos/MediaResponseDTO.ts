import type { Media } from "../../domain/entities/Media";
import type { PaginationResponseDTO } from "./PaginationResponseDTO";

export interface MediaResponseDTO {
	data: Media[];
	pagination: PaginationResponseDTO;
}
