import { PackageFetchResponse } from "../types/PackageManager";

export abstract class PackageManager {
	protected apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}
    
	abstract fetchPackage(packageName: string): Promise<PackageFetchResponse>;
}
