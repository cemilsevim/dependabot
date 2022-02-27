import PackageManagerConfig from './config/PackageManagerConfig';
import FileFetcher from './FileFetcher';
import FileParser from './FileParser';
import { PackageManagerFactory } from './package_managers/PackageManagerFactory';
import { PackageManagementFile } from './types/PackageManagementFiles';
import { OutdatedPackage } from './types/PackageManager';

class PackageChecker {
	private fileFetcher: FileFetcher;
	private fileParser: FileParser;

	constructor() {
		this.fileFetcher = new FileFetcher();
		this.fileParser = new FileParser();
	}

	async findOutdatedPackages(repositoryUrl: string) {
		const outDatedPackages: OutdatedPackage[] = [];
		const gitFetchedFileContents = await this.fileFetcher.fetch(
			repositoryUrl,
			PackageManagerConfig.managementFiles
		);
		const gitFileContents = gitFetchedFileContents.fileContents;
		const packageManagementFiles =
			gitFileContents as PackageManagementFile[];
		const parsedFiles = await this.fileParser.parse(packageManagementFiles);

		for (const parsedFile of parsedFiles) {
			console.log(`${parsedFile.path} checking...`);
			const dependencies = parsedFile.dependencies;
			if (dependencies) {
				const packageManagerName =
					PackageManagerConfig.fileManagers[parsedFile.name];
				const packageManager =
					PackageManagerFactory.getPackageManagerInstance(
						packageManagerName
					);
				for (let [packageName, packageVersion] of Object.entries(
					dependencies
				)) {
					packageVersion = packageVersion
						.replace('^', '')
						.replace('~', '');
					const packageDetail = await packageManager.fetchPackage(
						packageName
					);
					if (packageVersion != packageDetail.latestVersion.version) {
						console.log(`'${packageName}' package is outdated.`);

						outDatedPackages.push({
							...packageDetail,
							current_version: packageVersion,
						});
					} else {
						console.log(`'${packageName}' package is up to date.`);
					}
				}
			} else {
				console.warn(`${parsedFile.path} not found dependencies.`);
			}
		}

		return outDatedPackages;
	}
}

export default PackageChecker;
