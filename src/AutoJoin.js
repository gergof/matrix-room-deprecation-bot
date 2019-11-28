const init = ({ config, matrixClient, logger }) => {
	matrixClient.on('RoomMember.membership', (e, member) => {
		if (member.membership == 'invite' && member.userId == config.matrix.user) {
			logger.log({
				level: 'info',
				message: `Invited to room ${member.roomId}. Joining it`
			});
			matrixClient.joinRoom(member.roomId).then(
				() => {
					logger.log({ level: 'debug', message: 'Successfully joined room' });
				},
				e => {
					logger.log({
						level: 'error',
						message: 'There was an error joining the room.' + e
					});
				}
			);
		}
	});
};

export { init };
