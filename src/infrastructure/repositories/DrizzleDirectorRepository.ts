import { eq } from "drizzle-orm";
import type {
	Director,
	NewDirector,
	UpdateDirector,
} from "../../domain/entities/director";
import type { IDirectorRepository } from "../../domain/ports/IDirectorRepository";
import type { Database } from "../db";
import { director } from "../db/tables/director";

export class DrizzleDirectorRepository implements IDirectorRepository {
	constructor(private db: Database) {}

	async addNewDirector(newDirector: NewDirector): Promise<Director> {
		const [result] = await this.db
			.insert(director)
			.values(newDirector)
			.returning();
		return result;
	}

	async updateDirector(
		id: number,
		directorData: UpdateDirector,
	): Promise<Director | null> {
		const [result] = await this.db
			.update(director)
			.set({
				...directorData,
				updatedAt: new Date(),
			})
			.where(eq(director.id, id))
			.returning();
		return result || null;
	}
}
