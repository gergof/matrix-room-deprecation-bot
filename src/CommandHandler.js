import help from './commands/help';
import getConfig from './commands/getConfig';
import confMessage from './commands/message';
import confInvite from './commands/invite';
import confThrottle from './commands/throttle';
import deprecate from './commands/deprecate';
import undeprecate from './commands/undeprecate';

const init = ({ matrixClient, db, logger }) => {
	logger.log({ level: 'info', message: 'Starting command handler' });

	matrixClient.on('event', e => {
		if (e.event.type == 'm.room.message') {
			//only react for messages
			const message = e.event.content.body;

			if (message.indexOf('!deprecate') == 0) {
				if (
					['help', 'get-config', 'message', 'invite', 'throttle'].includes(
						message.split(' ')[1]
					)
				) {
					switch (message.split(' ')[1]) {
						case 'help':
							help(e, { matrixClient, db, logger });
							break;
						case 'get-config':
							getConfig(e, { matrixClient, db, logger });
							break;
						case 'message':
							confMessage(e, { matrixClient, db, logger });
							break;
						case 'invite':
							confInvite(e, { matrixClient, db, logger });
							break;
						case 'throttle':
							confThrottle(e, { matrixClient, db, logger });
							break;
					}
				} else {
					deprecate(e, { matrixClient, db, logger });
				}
			}

			if (message.indexOf('!undeprecate') == 0) {
				undeprecate(e, { matrixClient, db, logger });
			}
		}
	});
};

export { init };
