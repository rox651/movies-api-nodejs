import type { MediaDTO, MediaParamsDTO } from "../entities/media";
import type { CreateMediaDTO } from "../../presentation/dto/media";

export interface IMediaRepository {
	getAllMedia(params: MediaParamsDTO): Promise<MediaDTO[]>;
	getMediaById(id: number): Promise<MediaDTO | null>;
	addNewMedia(media: CreateMediaDTO): Promise<MediaDTO>;
}
