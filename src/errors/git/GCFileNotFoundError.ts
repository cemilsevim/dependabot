import GitError from './GitError';

class GCFileNotFoundError extends GitError {
	constructor(message: string = 'File not found.') {
		super(message);

		this.name = 'GCFileNotFoundError';
	}
}

export default GCFileNotFoundError;
