import { Client } from './git_clients/Client';
import GithubClient from './git_clients/GithubClient';
import { Git } from './types';
import { FileContent } from './types/Git';

interface Fetched {
	client: Client;
	fileContents: FileContent[];
}

class FileFetcher {
	async fetch(repositoryUrl: string, fileNames: string[]): Promise<Fetched> {
		const gitProvider = 'github.com';
		const gitClients = {
			'github.com': GithubClient,
		};
		const gitClient: Client = new gitClients[gitProvider]();
		const fileContents = await gitClient.fetchFileContents(
			repositoryUrl,
			fileNames
		);

		return {
			client: gitClient,
			fileContents,
		};
	}
}

export default FileFetcher;
