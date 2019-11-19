let matrixClient;

const init = ({ config, logger }) => {
	console.log = msg => logger.log({ level: 'info', message: msg });
	console.warn = msg => logger.log({ level: 'warning', message: msg });
	console.error = msg => logger.log({ level: 'error' });
	const Matrix = require('matrix-js-sdk');

	logger.log({ level: 'info', message: 'Starting Matrix Client' });
	matrixClient = Matrix.createClient({
		baseUrl: config.matrix.server,
		userId: config.matrix.user,
		accessToken: config.matrix.token
	});

	matrixClient.startClient().then(
		() => {
			logger.log({
				level: 'info',
				message: 'Matrix client started'
			});
		},
		e => {
			logger.log({
				level: 'error',
				message: 'Matrix client failed to start. Error: ' + e
			});
		}
	);
};

export { init };
export default matrixClient;
