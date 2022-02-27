import { PackageManagementFileFactory } from './package_management_files/PackageManagementFileFactory';
import {
	PackageManagementFile,
	PackageManagementFiles,
	ParsedPackageManagementFile,
} from './types/PackageManagementFiles';

class FileParser {
	parse(
		packageManagementFiles: PackageManagementFile[]
	): ParsedPackageManagementFile[] {
		const parsedPackageManagementFiles: ParsedPackageManagementFile[] = [];

		packageManagementFiles.forEach((packageManagementFile) => {
			try {
				const file = PackageManagementFileFactory.getFileInstance(
					packageManagementFile.name as PackageManagementFiles
				);
				file.content = packageManagementFile.content;
				const parsedContent = file.parse();
				const dependencies = file.dependencies();
				const parsedPackageManagementFile = {
					name: packageManagementFile.name,
					content: parsedContent,
					dependencies: dependencies,
					path: packageManagementFile.path,
					size: packageManagementFile.size,
				};
	
				parsedPackageManagementFiles.push(parsedPackageManagementFile);
			} catch (error) {
				console.error('File parsing error!', error);
			}
		});

		return parsedPackageManagementFiles;
	}
}

export default FileParser;
