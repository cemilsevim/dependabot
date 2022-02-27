export interface NpmManagementFileContent {
	name: string;
	version: string;
	description: string;
	engines: {
        [key: string]: string;
    };
	devDependencies: {
        [key: string]: string;
    };
	scripts: {
        [key: string]: string;
    };
	author: string;
	license: string; 
	dependencies: {
        [key: string]: string;
    };
}