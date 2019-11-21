const deprecate = (e, { db, matrixClient, logger }) => {
	const message = e.event.content.body;
	const targetId = message.split(' ')[1];

	db.get(e.sender.roomId).then(
		res => {
			if (res) {
				//room already exists
				logger.log({
					level: 'debug',
					message: `Bot already configured for room ${e.sender.roomId}`
				});

				matrixClient.sendTextMessage(
					e.sender.roomId,
					'This room already configured for deprecation bot. To relay to another room please type !undeprecate and then try again!',
					''
				);
			}
		},
		() => {
			//room does not exist
			logger.log({
				level: 'debug',
				message: `Room ${e.sender.roomId} is not configured. Trying to join target`
			});

			const initDeprecationBot = () => {
				db.put(e.sender.roomId, targetId).then(() => {
					matrixClient.sendTextMessage(
						e.sender.roomId,
						'Deprecation Bot successfully configured. Next time someone joins, he will get auto invited and a message will be sent out to him. To cancel this action, type !undeprecate',
						''
					);

					matrixClient.sendTextMessage(
						targetId,
						`Deprecation Bot was configured for room ${e.sender.roomId} to route the users here!`,
						''
					);
				});
			};

			matrixClient.joinRoom(targetId).then(
				() => {
					logger.log({
						level: 'debug',
						message: `Joined room ${targetId}`
					});

					initDeprecationBot();
				},
				() => {
					logger.log({
						level: 'debug',
						message: `Failed to join room ${targetId}`
					});

					matrixClient.sendTextMessage(
						e.sender.roomId,
						'm.room.message',
						'Could not configure the bot.\nPlease check the following:\n- The usage of the command !deprecate <target room id>\n- You have entered the ID of the target room correctly\n- The target room is public or you have invited the bot there as well.',
						''
					);
				}
			);
		}
	);
};

const undeprecate = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		() => {
			logger.log({
				level: 'info',
				message: `Disabled deprecation handler for ${e.sender.room}`
			});
			db.del(e.sender.roomId).then(() => {
				matrixClient.sendTextMessage(
					e.sender.roomId,
					'Successfully disabled Deprecation Bot',
					''
				);
			});
		},
		() => {
			matrixClient.sendTextMessage(
				e.sender.roomId,
				'Deprecation Bot not enabled for this room. Type !deprecate <target room id> to enable it!',
				''
			);
		}
	);
};

const init = ({ matrixClient, db, logger }) => {
	logger.log({ level: 'info', message: 'Starting command handler' });
	matrixClient.on('event', e => {
		if (e.event.type == 'm.room.message') {
			//only react for messages
			const message = e.event.content.body;
			if (message.indexOf('!deprecate') == 0) {
				deprecate(e, { matrixClient, db, logger });
			}

			if (message.indexOf('!undeprecate') == 0) {
				undeprecate(e, { matrixClient, db, logger });
			}
		}
	});
};

export { init };
