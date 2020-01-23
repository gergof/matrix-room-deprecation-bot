import { getLogger } from './Logger';
import config from './Config';
import { init as initDB } from './Datastore';
import { init as initMatrixClient } from './MatrixClient';
import { init as initCommandHandler } from './CommandHandler';
import { init as initAutoJoin } from './AutoJoin';
import { init as initDeprecationWarning } from './DeprecationWarning';

const logger = getLogger('main');

logger.log({ level: 'info', message: 'Starting Room Deprecation Bot' });

initDB({ config, logger: getLogger('datastore') }).then(db => {
	initMatrixClient({ config, logger: getLogger('matrix') }).then(
		matrixClient => {
			matrixClient.once('sync', () => {
				logger.log({
					level: 'info',
					message: 'Sync completed. Initializing modules'
				});

				initCommandHandler({
					config,
					matrixClient,
					db,
					logger: getLogger('cmd')
				});
				initAutoJoin({
					config,
					matrixClient,
					db,
					logger: getLogger('autjoin')
				});
				initDeprecationWarning({
					config,
					matrixClient,
					db,
					logger: getLogger('deprecation')
				});
			});
		}
	);

	process.on('SIGTERM', () => {
		logger.log({ level: 'info', message: 'Received SIGTERM. Closing.' });
		db.close().then(() => {
			logger.log({ level: 'info', message: 'Cleanup complete. Closing.' });
			process.exit(0);
		});
	});
});
