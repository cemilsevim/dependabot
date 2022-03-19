import GCNotFoundError from './errors/git/GCNotFoundError';
import { Client } from './git_clients/Client';
import { ClientFactory } from './git_clients/ClientFactory';
import { FetchedFileContents, FileContent, GitClientNames } from './types/Git';

class FileFetcher {
	private static instance: FileFetcher;

	public static getInstance(): FileFetcher {
		if (!FileFetcher.instance) {
			FileFetcher.instance = new FileFetcher();
		}

		return FileFetcher.instance;
	}

	async fetch(
		repositoryUrl: string,
		fileNames: string[],
	): Promise<FetchedFileContents> {
		const gitProvider = this.getClientNameByRepositoryUrl(repositoryUrl);
		const gitClient: Client = ClientFactory.getClientInstance(gitProvider);
		const fileContents = await gitClient.fetchFileContents(
			repositoryUrl,
			fileNames,
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
