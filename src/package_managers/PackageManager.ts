import { Package } from '../types/PackageManager';

export abstract class PackageManager {
	abstract fetchPackage(packageName: string): Promise<Package>;
}
