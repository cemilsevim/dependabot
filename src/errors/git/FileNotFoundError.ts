import GitError from './GitError';

class FileNotFoundError extends GitError {
	constructor(message: string = 'File not found.') {
		super(message);

		this.name = 'FileNotFoundError';
	}
}

export default FileNotFoundError;
