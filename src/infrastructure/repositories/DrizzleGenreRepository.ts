import { eq } from "drizzle-orm";
import type { Genre, NewGenre, UpdateGenre } from "../../domain/entities/genre";
import type { IGenreRepository } from "../../domain/ports/IGenreRepository";
import type { Database } from "../db";
import { genre } from "../db/tables/genre";

export class DrizzleGenreRepository implements IGenreRepository {
	constructor(private db: Database) {}

	async addNewGenre(newGenre: NewGenre): Promise<Genre> {
		const [result] = await this.db.insert(genre).values(newGenre).returning();
		return result;
	}

	async updateGenre(id: number, genreData: UpdateGenre): Promise<Genre | null> {
		const [result] = await this.db
			.update(genre)
			.set({
				...genreData,
				updatedAt: new Date(),
			})
			.where(eq(genre.id, id))
			.returning();
		return result || null;
	}
}
