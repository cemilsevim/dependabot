import axios from 'axios';
import { PackageFetchResponse } from '../types/PackageManager';
import { PackageManager } from './PackageManager';

class ComposerPackageManager extends PackageManager {
	private static instance: ComposerPackageManager;

	private constructor() {
		super('');
	}

	public static getInstance(): ComposerPackageManager {
		if (!ComposerPackageManager.instance) {
			ComposerPackageManager.instance = new ComposerPackageManager();
		}

		return ComposerPackageManager.instance;
	}

	fetchPackage(packageName: string): Promise<PackageFetchResponse> {
		return axios.get(`${this.apiUrl}/${packageName}`);
	}
}

export default ComposerPackageManager;
