let matrixClient;

const init = ({ config, logger }) => {
	return new Promise((resolve, reject) => {
		/* eslint-disable no-console */
		const oldLog = console.log;
		const oldWarn = console.warn;
		const oldError = console.error;
		console.log = (...msg) =>
			logger.log({ level: 'info', message: msg.join(' ') });
		console.warn = (...msg) =>
			logger.log({ level: 'warning', message: msg.join(' ') });
		console.error = (...msg) =>
			logger.log({ level: 'error', message: msg.join(' ') });
		/* eslint-enable */

		const Matrix = require('matrix-js-sdk');

		/* eslint-disable no-console */
		console.log = oldLog;
		console.warn = oldWarn;
		console.error = oldError;
		/* eslint-enable */

		logger.log({ level: 'info', message: 'Starting Matrix Client' });
		matrixClient = Matrix.createClient({
			baseUrl: config.matrix.server,
			userId: config.matrix.user,
			accessToken: config.matrix.token
		});

		matrixClient.startClient({ initialSyncLimit: 0 }).then(
			() => {
				logger.log({
					level: 'info',
					message: 'Matrix client started'
				});
				resolve(matrixClient);
			},
			e => {
				logger.log({
					level: 'error',
					message: 'Matrix client failed to start. Error: ' + e
				});
				reject(e);
			}
		);
	});
};

export { init };
export default matrixClient;
