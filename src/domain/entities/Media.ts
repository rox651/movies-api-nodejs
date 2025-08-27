import type { State } from "../types/State";

export class Media {
	constructor(
		public readonly id: number,
		private _title: string,
		private _description: string | null,
		private _state: State,
		private _release: Date,
		private _url: string,
		private _image: string,
		private _synopsis: string | null,
		public readonly typeId: number,
		public readonly directorId: number,
		private _genres: number[],
		public readonly createdAt: Date,
	) {}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get description(): string | null {
		return this._description;
	}

	set description(value: string | null) {
		this._description = value;
	}

	get state(): State {
		return this._state;
	}

	set state(value: State) {
		this._state = value;
	}

	get release(): Date {
		return this._release;
	}

	set release(value: Date) {
		this._release = value;
	}

	get url(): string {
		return this._url;
	}

	set url(value: string) {
		this._url = value;
	}

	get image(): string {
		return this._image;
	}

	set image(value: string) {
		this._image = value;
	}

	get synopsis(): string | null {
		return this._synopsis;
	}

	set synopsis(value: string | null) {
		this._synopsis = value;
	}

	get genres(): number[] {
		return this._genres;
	}

	set genres(value: number[]) {
		this._genres = value;
	}

	deactivate(): void {
		this.state = "inactive";
	}
}
