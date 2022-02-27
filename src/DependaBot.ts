import PackageChecker from './PackageChecker';

class DependaBot {
	private _packageChecker: PackageChecker;

	constructor() {
		this._packageChecker = new PackageChecker();
	}

	get packageChecker() {
		return this._packageChecker;
	}
}

export default DependaBot;

