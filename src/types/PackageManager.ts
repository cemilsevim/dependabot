export type PackageManagerNames = 'npm' | 'composer';
export interface Package {
	name: string;
	description: string;
}
export interface PackageVersion extends Package {
	version: string;
}

export type PackageFetchResponse = {
	name: string;
	description: string;
	latestVersion: PackageVersion;
	versions: PackageVersion[];
};
