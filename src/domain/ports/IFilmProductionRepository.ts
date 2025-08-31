import type {
	FilmProduction,
	NewFilmProduction,
	UpdateFilmProduction,
} from "../entities/filmProduction";

export interface IFilmProductionRepository {
	addNewFilmProduction(
		filmProduction: NewFilmProduction,
	): Promise<FilmProduction>;
	updateFilmProduction(
		id: number,
		filmProduction: UpdateFilmProduction,
	): Promise<FilmProduction | null>;
}
