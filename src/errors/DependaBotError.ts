class DependaBotError extends Error {
	constructor(message: string = '') {
		super();

		this.message = message;
		this.name = 'DependaBotError';
	}
}

export default DependaBotError;
