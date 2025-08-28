import type { Director, NewDirector } from "../../domain/entities/director";
import type { IDirectorRepository } from "../../domain/ports/IDirectorRepository";
import { createDirectorSchema } from "../../domain/validation/directorValidator";
import { parse } from "valibot";

export class DirectorService {
	constructor(private directorRepository: IDirectorRepository) {}

	async addNewDirector(director: NewDirector): Promise<Director> {
		const validatedDirector = parse(createDirectorSchema, director);
		return this.directorRepository.addNewDirector(validatedDirector);
	}
}
