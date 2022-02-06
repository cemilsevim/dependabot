import GCNotFoundError from './errors/git/GCNotFoundError';
import { Client } from './git_clients/Client';
import { ClientFactory } from './git_clients/ClientFactory';
import { FileContent, GitClientNames } from './types/Git';

interface Fetched {
	client: Client;
	fileContents: FileContent[];
}

class FileFetcher {
	async fetch(repositoryUrl: string, fileNames: string[]): Promise<Fetched> {
		const gitProvider = this.getClientNameByRepositoryUrl(repositoryUrl);
		const gitClient: Client = ClientFactory.getClientInstance(gitProvider);
		const fileContents = await gitClient.fetchFileContents(
			repositoryUrl,
			fileNames
		);

		return {
			client: gitClient,
			fileContents,
		};
	}

	getClientNameByRepositoryUrl(repositoryUrl: string): GitClientNames {
		let clientName: GitClientNames;

		if (repositoryUrl.includes('github.com')) {
			clientName = 'github';
		} else {
			throw new GCNotFoundError();
		}

		return clientName;
	}
}

export default FileFetcher;
