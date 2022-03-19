import PackageResolver from './PackageResolver';
import { ResolvedPackages, ResolvedPackage } from './types/PackageManager';

class PackageChecker {
	private packageResolver: PackageResolver;

	constructor() {
		this.packageResolver = PackageResolver.getInstance();
	}

	async findOutdatedPackages(
		repositoryUrl: string,
	): Promise<ResolvedPackages> {
		const outdatedPackages: ResolvedPackages = [];

		const resolvedPackages = await this.packageResolver.resolve(
			repositoryUrl,
		);
		for (const resolvedPackage of resolvedPackages) {
			const outdatePackage: ResolvedPackage[] = [];

			const packages = resolvedPackage.packages;
			for (const packageDetail of packages) {
				const packageName = packageDetail.name;
				const packageLatestVersion =
					packageDetail.latestVersion.version;
				const packageCurrentVersion = packageDetail.current_version;
				if (packageCurrentVersion !== packageLatestVersion) {
					console.log(`'${packageName}' package is outdated.`);

					outdatePackage.push({
						...packageDetail,
						current_version: packageCurrentVersion,
					});
				} else {
					console.log(`'${packageName}' package is up to date.`);
				}
			}

			outdatedPackages.push({
				path: resolvedPackage.path,
				packages: outdatePackage,
			});
		}

		return outdatedPackages;
	}
}

export default PackageChecker;
