class DependaBotError extends Error {
	constructor(message: string = 'Dependabot error!') {
		super(message);

		this.name = 'DependaBotError';
	}
}

export default DependaBotError;
