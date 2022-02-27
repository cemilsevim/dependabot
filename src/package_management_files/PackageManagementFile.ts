export abstract class PackageManagementFile {
	private _content: string;

	constructor(content: string) {
		this._content = content;
	}

	get content(): string {
		return this._content;
	}

	set content(value: string) {
		this._content = value;
	}

	abstract parse(): any;
	abstract dependencies():
		| {
				[key: string]: string;
		  }
		| undefined;
}
