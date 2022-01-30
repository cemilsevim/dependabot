import DependaBotError from '../DependaBotError';

class GitError extends DependaBotError {
	constructor(message: string) {
		super(message);

		this.name = 'GitError';
	}
}

export default GitError;
