import type { MediaDTO, MediaParamsDTO } from "../../domain/entities/media";
import type { IMediaRepository } from "../../domain/ports/IMediaRepository";
import type {
	CreateMediaDTO,
	MediaRequestParamsDTO,
} from "../../presentation/dto/media";
import { parse } from "valibot";
import { createMediaSchema } from "../../domain/validation/mediaValidator";

export class MediaService {
	constructor(private mediaRepository: IMediaRepository) {}

	async getAllMedia(params: MediaRequestParamsDTO): Promise<MediaDTO[]> {
		const newGenresIds = params.genreIds?.split(",").map(Number);
		const newParams: MediaParamsDTO = {
			...params,
			genreIds: newGenresIds,
		};
		return this.mediaRepository.getAllMedia(newParams);
	}

	async getMediaById(id: number): Promise<MediaDTO | null> {
		return this.mediaRepository.getMediaById(id);
	}

	async addNewMedia(media: CreateMediaDTO): Promise<MediaDTO> {
		const validatedMedia = parse(createMediaSchema, media);
		return this.mediaRepository.addNewMedia(validatedMedia);
	}
}
