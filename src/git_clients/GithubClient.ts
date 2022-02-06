import axios from 'axios';
import { Git } from '../types';
import { Client } from './Client';
import FileNotFoundError from '../errors/git/GCFileNotFoundError';

class GithubClient extends Client {
	private static instance: GithubClient;
	private searchCodeApiUrl = `${this.apiUrl}/search/code`;

	private constructor() {
		super('https://api.github.com');
	}

	public static getInstance(): GithubClient {
		if (!GithubClient.instance) {
			GithubClient.instance = new GithubClient();
		}

		return GithubClient.instance;
	}

	async fetchFileContents(repositoryUrl: string, fileNames: string[]) {
		const repositoryFullName = this.getRepositoryPath(repositoryUrl);
		const fileContents: Git.FileContent[] = [];

		const files = await this.searchFiles(repositoryFullName, fileNames);
		for (const file of files) {
			const fileContent = await this.fetchFileContent(file.url);
			fileContents.push(fileContent);
		}

		return fileContents;
	}

	async fetchFileContent(fileUrl: string) {
		const fileContentResponse = await axios.get(fileUrl);
		const fileContentResponseData = fileContentResponse.data;
		const base64Content = fileContentResponseData.content;
		const buffer = Buffer.from(base64Content, 'base64');
		const asciiContent = buffer.toString('ascii');

		const fileContent: Git.FileContent = {
			name: fileContentResponseData.name,
			path: fileContentResponseData.path,
			content: asciiContent,
			size: fileContentResponseData.size,
		};
		return fileContent;
	}

	async searchFiles(repositoryFullName: string, fileNames: string[]) {
		const repo = `repo:${repositoryFullName}`;
		let q = `q=${repo}+`;

		let filename = '';
		fileNames.forEach((fileName) => {
			filename += `filename:${fileName}+`;
		});
		filename = filename.slice(0, -1);
		q += filename;

		const searchResultResponse = await axios.get(
			`${this.searchCodeApiUrl}?${q}`
		);
		const searchResultResponseData = searchResultResponse.data;
		const items = searchResultResponseData.items;

		if (items.length > 0) {
			return items;
		} else {
			throw new FileNotFoundError();
		}
	}
}

export default GithubClient;
