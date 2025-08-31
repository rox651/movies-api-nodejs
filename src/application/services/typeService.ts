import type { Type, NewType } from "../../domain/entities/type";
import type { ITypeRepository } from "../../domain/ports/ITypeRepository";
import { parse } from "valibot";
import { createTypeSchema } from "../../domain/validation/typeValidator";

export class TypeService {
	constructor(private typeRepository: ITypeRepository) {}

	async addNewType(type: NewType): Promise<Type> {
		const validatedType = parse(createTypeSchema, type);
		return this.typeRepository.addNewType(validatedType);
	}

	async updateType(id: number, type: Partial<NewType>): Promise<Type | null> {
		return this.typeRepository.updateType(id, type);
	}
}
