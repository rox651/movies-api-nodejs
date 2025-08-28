import type { Type, NewType } from "../entities/type";

export interface ITypeRepository {
	addNewType(type: NewType): Promise<Type>;
}
