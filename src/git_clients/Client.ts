import { Git } from '../types';

export abstract class Client {
	protected apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

	abstract fetchFileContents(
		repositoryUrl: string,
		fileNames: string[]
	): Promise<Git.FileContent[]>;
	abstract fetchFileContent(fileUrl: string): Promise<Git.FileContent>;

	getRepositoryPath(repositoryUrl: string) {
		const url = new URL(repositoryUrl);
		let pathname = url.pathname;
		pathname = pathname.slice(1, pathname.length);

		return pathname;
	}
}
