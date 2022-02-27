export type PackageManagerNames = 'npm' | 'composer';

export type Package = {
	name: string;
	description: string;
	latestVersion: PackageVersion;
	versions: PackageVersion[];
};
export interface PackageVersion {
	name: string;
	description: string;
	version: string;
}

export interface OutdatedPackage extends Package{
	current_version: string;
}