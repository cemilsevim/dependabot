import DependaBotError from '../DependaBotError';

class PackageManagerError extends DependaBotError {
	constructor(message: string = 'Package manager error!') {
		super(message);

		this.name = 'PackageManagerError';
	}
}

export default PackageManagerError;
