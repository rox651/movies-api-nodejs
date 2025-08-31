import type { Type, NewType } from "../../domain/entities/type";
import type { ITypeRepository } from "../../domain/ports/ITypeRepository";
import type { Database } from "../db";
import { typeTable } from "../db/tables/typeTable";

export class DrizzleTypeRepository implements ITypeRepository {
	constructor(private db: Database) {}

	async addNewType(newType: NewType): Promise<Type> {
		const [result] = await this.db
			.insert(typeTable)
			.values(newType)
			.returning();
		return result;
	}
}
