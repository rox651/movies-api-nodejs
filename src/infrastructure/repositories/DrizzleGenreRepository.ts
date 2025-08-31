import type { Genre, NewGenre } from "../../domain/entities/genre";
import type { IGenreRepository } from "../../domain/ports/IGenreRepository";
import type { Database } from "../db";
import { genre } from "../db/tables/genre";

export class DrizzleGenreRepository implements IGenreRepository {
	constructor(private db: Database) {}

	async addNewGenre(newGenre: NewGenre): Promise<Genre> {
		const [result] = await this.db.insert(genre).values(newGenre).returning();
		return result;
	}
}
