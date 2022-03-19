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

export interface ResolvedPackage extends Package {
	current_version: string;
}

export type ResolvedPackages = {
	path: string;
	packages: ResolvedPackage[];
}[];