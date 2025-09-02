import type {
	MediaDTO,
	MediaParamsDTO,
	UpdateMediaDTO,
} from "../entities/Media";
import type { CreateMediaDTO } from "../../presentation/dto/media";

export interface IMediaRepository {
	getAllMedia(params: MediaParamsDTO): Promise<MediaDTO[]>;
	getMediaById(id: number): Promise<MediaDTO | null>;
	addNewMedia(media: CreateMediaDTO): Promise<MediaDTO>;
	updateMedia(id: number, media: UpdateMediaDTO): Promise<MediaDTO | null>;
}
