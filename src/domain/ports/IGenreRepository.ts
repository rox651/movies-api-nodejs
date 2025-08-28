import type { Genre, NewGenre } from "../entities/genre";

export interface IGenreRepository {
	addNewGenre(genre: NewGenre): Promise<Genre>;
}
