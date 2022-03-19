import PackageManagerConfig from './config/PackageManagerConfig';
import FileFetcher from './FileFetcher';
import FileParser from './FileParser';
import { PackageManagerFactory } from './package_managers/PackageManagerFactory';
import { PackageManagementFile } from './types/PackageManagementFiles';
import { ResolvedPackage, ResolvedPackages } from './types/PackageManager';

class PackageResolver {
	private fileFetcher: FileFetcher;
	private fileParser: FileParser;
	private static instance: PackageResolver;

	private constructor() {
		this.fileFetcher = FileFetcher.getInstance();
		this.fileParser = FileParser.getInstance();
	}

	public static getInstance(): PackageResolver {
		if (!PackageResolver.instance) {
			PackageResolver.instance = new PackageResolver();
		}

		return PackageResolver.instance;
	}

	async resolve(repositoryUrl: string) {
		const resolvedPackages: ResolvedPackages = [];
		const gitFetchedFileContents = await this.fileFetcher.fetch(
			repositoryUrl,
			PackageManagerConfig.managementFiles,
		);
		const gitFileContents = gitFetchedFileContents.fileContents;
		const packageManagementFiles =
			gitFileContents as PackageManagementFile[];
		const parsedFiles = await this.fileParser.parse(packageManagementFiles);

		for (const parsedFile of parsedFiles) {
			const packages: ResolvedPackage[] = [];

			console.log(`${parsedFile.path} checking...`);
			const dependencies = parsedFile.dependencies;
			if (dependencies) {
				const packageManagerName =
					PackageManagerConfig.fileManagers[parsedFile.name];
				const packageManager =
					PackageManagerFactory.getPackageManagerInstance(
						packageManagerName,
					);
				for (let [packageName, packageVersion] of Object.entries(
					dependencies,
				)) {
					packageVersion = packageVersion
						.replace('^', '')
						.replace('~', '');
					const packageDetail = await packageManager.fetchPackage(
						packageName,
					);

					packages.push({
						...packageDetail,
						current_version: packageVersion,
					});
				}

				resolvedPackages.push({
					path: parsedFile.path,
					packages: packages,
				});
			} else {
				console.warn(`${parsedFile.path} not found dependencies.`);
			}
		}

		console.log(resolvedPackages);

		return resolvedPackages;
	}
}

export default PackageResolver;
