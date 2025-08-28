import type {
	FilmProduction,
	NewFilmProduction,
} from "../../domain/entities/filmProduction";
import type { IFilmProductionRepository } from "../../domain/ports/IFilmProductionRepository";
import type { Database } from "../db";
import { filmProduction } from "../db/tables";

export class DrizzleFilmProductionRepository
	implements IFilmProductionRepository
{
	constructor(private db: Database) {}

	async addNewFilmProduction(
		newFilmProduction: NewFilmProduction,
	): Promise<FilmProduction> {
		const [result] = await this.db
			.insert(filmProduction)
			.values(newFilmProduction)
			.returning();
		return result;
	}
}
