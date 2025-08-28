import type {
	FilmProduction,
	NewFilmProduction,
} from "../entities/filmProduction";

export interface IFilmProductionRepository {
	addNewFilmProduction(
		filmProduction: NewFilmProduction,
	): Promise<FilmProduction>;
}
