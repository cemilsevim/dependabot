import { PackageManagementFiles } from '../types/PackageManagementFiles';
import { ComposerManagementFile } from './ComposerManagementFile';
import { NpmManagementFile } from './NpmManagementFile';
import { PackageManagementFile } from './PackageManagementFile';

export class PackageManagementFileFactory {
	static getFileInstance(file: PackageManagementFiles): PackageManagementFile {
		let fileParser: PackageManagementFile;

		console.log(file);

		if (file === 'package.json') {
			fileParser = new NpmManagementFile('');
		} else if(file === 'composer.json') {
			fileParser = new ComposerManagementFile('');
		} else {
			throw new Error('');
		}

		return fileParser;
	}
}
