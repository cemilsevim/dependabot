import { NpmManagementFileContent } from '../types/Npm';
import { PackageManagementFile } from './PackageManagementFile';

export class NpmManagementFile extends PackageManagementFile {
	parsedContent: NpmManagementFileContent | undefined;

	constructor(content: string) {
		super(content);
	}

	parse() {
		const parsedContent = JSON.parse(this.content);
		this.parsedContent = parsedContent;

		return this.parsedContent;
	}

	dependencies() {
		return {
			...this.parsedContent?.dependencies,
			...this.parsedContent?.devDependencies,
		};
	}
}
