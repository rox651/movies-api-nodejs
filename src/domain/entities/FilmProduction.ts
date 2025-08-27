import type { State } from "../types/State";

export class FilmProduction {
	constructor(
		public readonly id: number,
		private _name: string,
		private _slogan: string,
		private _state: State,
		private _description: string,
		public readonly createdAt: Date,
	) {}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get slogan(): string {
		return this._slogan;
	}

	set slogan(value: string) {
		this._slogan = value;
	}

	get state(): State {
		return this._state;
	}

	set state(value: State) {
		this._state = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	deactivate(): void {
		this.state = "inactive";
	}
}
