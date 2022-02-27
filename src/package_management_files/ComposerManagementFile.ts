import { ComposerManagementFileContent } from '../types/Composer';
import { PackageManagementFile } from './PackageManagementFile';

export class ComposerManagementFile extends PackageManagementFile {
	parsedContent: ComposerManagementFileContent | undefined;

	constructor(content: string) {
		super(content);
	}

	parse() {
		const parsedContent = JSON.parse(this.content);
		this.parsedContent = parsedContent;

		return this.parsedContent;
	}

	dependencies() {
		return this.parsedContent?.require;
	}
}
