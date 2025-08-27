export class Type {
	constructor(
		public readonly id: number,
		private _name: string,
		private _description: string,
		public readonly createdAt: Date,
	) {}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}
}
