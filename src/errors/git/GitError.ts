import DependaBotError from '../DependaBotError';

class GitError extends DependaBotError {
	constructor(message: string = 'Git error!') {
		super(message);

		this.name = 'GitError';
	}
}

export default GitError;
