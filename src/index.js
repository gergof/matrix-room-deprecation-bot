import { getLogger } from './Logger';
import config from './Config';
import { init as initMatrixClient } from './MatrixClient';

const logger=getLogger('main');

logger.log({ level: 'info', message: 'Starting Room Deprecation Bot' });

initMatrixClient({ config, logger: getLogger('matrix') });
