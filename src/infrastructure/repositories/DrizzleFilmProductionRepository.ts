import { eq } from "drizzle-orm";
import type {
	FilmProduction,
	NewFilmProduction,
	UpdateFilmProduction,
} from "../../domain/entities/filmProduction";
import type { IFilmProductionRepository } from "../../domain/ports/IFilmProductionRepository";
import type { Database } from "../db";
import { filmProduction } from "../db/tables/film_production";

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

	async updateFilmProduction(
		id: number,
		filmProductionData: UpdateFilmProduction,
	): Promise<FilmProduction | null> {
		const [result] = await this.db
			.update(filmProduction)
			.set({
				...filmProductionData,
				updatedAt: new Date(),
			})
			.where(eq(filmProduction.id, id))
			.returning();
		return result || null;
	}
}
