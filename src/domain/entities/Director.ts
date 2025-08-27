import type { State } from "../types/State";

export class Director {
	constructor(
		public readonly id: number,
		private _names: string,
		private _lastnames: string,
		private _state: State,
		public readonly createdAt: Date,
	) {}

	get names(): string {
		return this._names;
	}

	set names(value: string) {
		this._names = value;
	}

	get lastnames(): string {
		return this._lastnames;
	}

	set lastnames(value: string) {
		this._lastnames = value;
	}

	get state(): State {
		return this._state;
	}

	set state(value: State) {
		this._state = value;
	}

	deactivate(): void {
		this.state = "inactive";
	}
}
