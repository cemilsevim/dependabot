import axios from 'axios';
import { Package } from '../types/PackageManager';
import { PackageManager } from './PackageManager';

class ComposerPackageManager extends PackageManager {
	private static instance: ComposerPackageManager;
	private apiUrl: string = '';

	public static getInstance(): ComposerPackageManager {
		if (!ComposerPackageManager.instance) {
			ComposerPackageManager.instance = new ComposerPackageManager();
		}

		return ComposerPackageManager.instance;
	}

	fetchPackage(packageName: string): Promise<Package> {
		return axios.get(`${this.apiUrl}/${packageName}`);
	}
}

export default ComposerPackageManager;
