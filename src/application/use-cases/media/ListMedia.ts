import type { MediaRepository } from "../../../infraestructure/repositories/MediaRepository";
import type { MediaQueryDTO } from "../../../domain/dtos/MediaDTO";
import { MEDIA_LIMIT } from "../../../domain/constants";

export class ListMedia {
	constructor(private mediaRepo: MediaRepository) {}

	async execute(query?: MediaQueryDTO) {
		const defaultQuery: MediaQueryDTO = {
			genreIds: [],
			pagination: {
				offset: 0,
				limit: MEDIA_LIMIT,
			},
		};

		return this.mediaRepo.getAll(query || defaultQuery);
	}
}
