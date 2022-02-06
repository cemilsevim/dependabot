import GCFactoryNullError from '../errors/git/GCFactoryNullError';
import { GitClientNames } from '../types/Git';
import { Client } from './Client';
import GithubClient from './GithubClient';

export class ClientFactory {
	static getClientInstance(client: GitClientNames): Client {
		let gitClient: Client;

		if (client === 'github') {
			gitClient = GithubClient.getInstance();
		} else {
			throw new GCFactoryNullError();
		}

		return gitClient;
	}
}
