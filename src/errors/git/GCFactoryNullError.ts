import GitError from './GitError';

class GCFactoryNullError extends GitError {
	constructor(message: string = 'Github client factory method failed to produce a value.') {
		super(message);

		this.name = 'GCFactoryNullError';
	}
}

export default GCFactoryNullError;
