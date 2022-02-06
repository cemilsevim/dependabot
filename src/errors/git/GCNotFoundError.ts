import GitError from './GitError';

class GCNotFoundError extends GitError {
	constructor(message: string = 'Not found git client name!') {
		super(message);

		this.name = 'GCNotFoundError';
	}
}

export default GCNotFoundError;
