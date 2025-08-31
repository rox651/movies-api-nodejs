import type {
	Director,
	NewDirector,
	UpdateDirector,
} from "../entities/director";

export interface IDirectorRepository {
	addNewDirector(director: NewDirector): Promise<Director>;
	updateDirector(
		id: number,
		director: UpdateDirector,
	): Promise<Director | null>;
}
