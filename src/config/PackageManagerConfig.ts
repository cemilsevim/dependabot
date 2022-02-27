import { PackageManagementFiles } from "../types/PackageManagementFiles";
import { PackageManagerNames } from "../types/PackageManager";

interface PackageManagerConfig {
	managementFiles: string[];
	fileManagers: {
		[key in PackageManagementFiles]: PackageManagerNames;
	}
}

const config: PackageManagerConfig = {
	managementFiles: ['package.json', 'composer.json'],
	fileManagers: {
		'package.json': 'npm',
		'composer.json': 'composer',
	},
};

export default config;