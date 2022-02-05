class DependaBotError extends Error {
	constructor(message: string = 'Dependa bot error!') {
		super(message);

		this.name = 'DependaBotError';
	}
}

export default DependaBotError;
