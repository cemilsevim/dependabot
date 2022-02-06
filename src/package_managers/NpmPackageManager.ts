import axios from 'axios';
import { PackageFetchResponse } from '../types/PackageManager';
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

	fetchPackage(packageName: string): Promise<PackageFetchResponse> {
		return axios.get(`${this.apiUrl}/${packageName}`);
	}
}

export default NpmPackageManager;
