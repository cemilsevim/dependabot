import PackageManagerError from './PackageManagerError';

class PMFactoryNullError extends PackageManagerError {
	constructor(message: string = 'Package manager factory method failed to produce a value.') {
		super(message);

		this.name = 'PMFactoryNullError';
	}
}

export default PMFactoryNullError;
