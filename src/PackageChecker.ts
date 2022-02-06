import FileFetcher from "./FileFetcher";
import { PackageManagerFactory } from "./package_managers/PackageManagerFactory";

class PackageChecker {
    private fileFetcher;

    constructor() {
        this.fileFetcher = new FileFetcher();
    }

    async findOutdatedPackages(repositoryUrl: string) {
        // const packageManagementFiles = await this.fileFetcher.fetch(repositoryUrl, ['package.json', 'composer.json']);
        // const parsedFiles: any = [];
        // const outDatedPackages = [];
        
        // for (const file of parsedFiles) {
        //     const packageManager = PackageManagerFactory.getPackageManagerInstance(file.manager);
        //     for (const package of file.packages) {
        //         const packageDetail = await packageManager.fetchPackage(package.name);
        //         if(package.version != packageDetail.latestVersion.version) {
        //             outDatedPackages.push(package);
        //         }
        //     }
        // }

        // return outDatedPackages;
    }
}

export default PackageChecker;

