import axios from 'axios';
import { Package } from '../types/PackageManager';
import { PackageManager } from './PackageManager';

class NpmPackageManager extends PackageManager {
	private static instance: NpmPackageManager;

	private constructor() {
		super('https://registry.npmjs.org');
	}

	public static getInstance(): NpmPackageManager {
		if (!NpmPackageManager.instance) {
			NpmPackageManager.instance = new NpmPackageManager();
		}

		return NpmPackageManager.instance;
	}

	async fetchPackage(packageName: string): Promise<Package> {
		const packageResponse = await axios.get(
			`${this.apiUrl}/${packageName}`
		);
		const packageData = packageResponse.data;
		const versions = packageData.versions;
		const latestVersionNumber = packageData['dist-tags'].latest;
		const latestVersionData = versions[latestVersionNumber];

		return {
			name: packageData.name,
			description: packageData.description,
			latestVersion: {
				name: latestVersionData.name,
				description: latestVersionData.description,
				version: latestVersionData.version,
			},
			versions: Object.keys(versions).map((versionNumber) => {
				const version = versions[versionNumber];

				return {
					name: version.name,
					description: version.description,
					version: version.version,
				};
			}),
		};
	}
}

export default NpmPackageManager;
