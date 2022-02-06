import PMFactoryNullError from '../errors/package_manager/PMFactoryNullError';
import { PackageManagerNames } from '../types/PackageManager';
import ComposerPackageManager from './ComposerPackageManager';
import NpmPackageManager from './NpmPackageManager';
import { PackageManager } from './PackageManager';

export class PackageManagerFactory {
	static getPackageManagerInstance(packageManagerName: PackageManagerNames): PackageManager {
		let packageManager: PackageManager;

		if (packageManagerName === 'npm') {
			packageManager = NpmPackageManager.getInstance();
		} else if (packageManagerName === 'composer') {
            packageManager = ComposerPackageManager.getInstance();
        }else {
			throw new PMFactoryNullError();
		}

		return packageManager;
	}
}
