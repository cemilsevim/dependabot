export type PackageManagementFiles = 'package.json' | 'composer.json';

export interface PackageManagementFile {
	name: PackageManagementFiles;
	path: string;
	content: string;
	size: number;
}

export interface ParsedPackageManagementFile {
	name: PackageManagementFiles;
	content: {
		[key: string]: string;
	};
	dependencies:
		| {
				[key: string]: string;
		  }
		| undefined;
	path: string;
	size: number;
}
