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

	private transformStringToArrayOfNumbers(text?: string): number[] | undefined {
		return text?.split(",").map(Number);
	}

	async getAllMedia(params: MediaRequestParamsDTO): Promise<MediaDTO[]> {
		const newGenresIds = this.transformStringToArrayOfNumbers(params.genreIds);
		const newFilmProductionIds = this.transformStringToArrayOfNumbers(
			params.filmProductionIds,
		);
		const newParams: MediaParamsDTO = {
			...params,
			genreIds: newGenresIds,
			filmProductionIds: newFilmProductionIds,
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
