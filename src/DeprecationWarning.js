const sendDeprecationMessage = (e, targetId, { matrixClient }) => {
	matrixClient.sendHtmlMessage(
		e.sender.roomId,
		`This room is deprecated. Please join ${targetId} instead!`,
		`<h3><font color="red" data-mx-color="red">This room is deprecated. Please join <a href="https://matrix.to/#/${targetId}">This room</a> instead.</font></h3>`,
		''
	);
};

const inviteToTarget = (member, targetId, { matrixClient }) => {
	matrixClient.invite(targetId, member.userId);
};

const init = ({ matrixClient, db, logger }) => {
	matrixClient.on('event', e => {
		if (e.event.type == 'm.room.message' && e.sender) {
			db.get(e.sender.roomId).then(
				targetId => {
					logger.log({
						level: 'debug',
						message: 'Sending deprecation warning'
					});
					sendDeprecationMessage(e, targetId, { matrixClient });
				},
				() => {
					logger.log({ level: 'debug', message: 'Room is not deprecated' });
				}
			);
		}
	});

	matrixClient.on('RoomMember.membership', (e, member) => {
		if (member.membership == 'join') {
			db.get(member.roomId).then(
				targetId => {
					logger.log({
						level: 'debug',
						message: 'Sending deprecation warning on join'
					});
					sendDeprecationMessage(
						{ sender: { roomId: member.roomId } },
						targetId,
						{ matrixClient }
					);
					inviteToTarget(member, targetId, { matrixClient });
				},
				() => {
					logger.log({ level: 'debug', message: 'Room is not deprecated' });
				}
			);
		}
	});
};

export { init };
