import type { Director, NewDirector } from "../entities/director";

export interface IDirectorRepository {
	addNewDirector(director: NewDirector): Promise<Director>;
}
