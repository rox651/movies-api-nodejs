import type { Genre, NewGenre, UpdateGenre } from "../entities/genre";

export interface IGenreRepository {
	addNewGenre(genre: NewGenre): Promise<Genre>;
	updateGenre(id: number, genre: UpdateGenre): Promise<Genre | null>;
}
