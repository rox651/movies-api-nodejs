import type { Director, NewDirector } from "../../domain/entities/director";
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
}
