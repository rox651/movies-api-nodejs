import type { Genre, NewGenre } from "../../domain/entities/genre";
import type { IGenreRepository } from "../../domain/ports/IGenreRepository";
import { parse } from "valibot";
import { createGenreSchema } from "../../domain/validation/genreValidator";

export class GenreService {
	constructor(private genreRepository: IGenreRepository) {}

	async addNewGenre(genre: NewGenre): Promise<Genre> {
		const validatedGenre = parse(createGenreSchema, genre);
		return this.genreRepository.addNewGenre(validatedGenre);
	}
}
