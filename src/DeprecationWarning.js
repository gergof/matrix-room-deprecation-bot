import Mustache from 'mustache';
import sanitizeHtml from 'sanitize-html';

const sendDeprecationMessage = (e, data, { matrixClient }) => {
	const renderParams = {
		currentRoomId: e.sender.roomId,
		roomId: data.roomId,
		roomLink: `<a href="https://matrix.to/#/${data.roomId}">This room</a>`
	};

	matrixClient.sendHtmlMessage(
		e.sender.roomId,
		sanitizeHtml(Mustache.render(data.message, renderParams), {
			allowedTags: []
		}),
		Mustache.render(data.message, renderParams)
	);
};

const inviteToTarget = (member, data, { matrixClient }) => {
	matrixClient.invite(data.roomId, member.userId);
};

const init = ({ matrixClient, db, logger }) => {
	const throttle = {};

	matrixClient.on('event', e => {
		if (e.event.type == 'm.room.message' && e.sender) {
			db.get(e.sender.roomId).then(
				data => {
					data = JSON.parse(data);
					if (
						throttle[e.sender.roomId] &&
						throttle[e.sender.roomId] > Date.now()
					) {
						return;
					}

					throttle[e.sender.roomId] = Date.now() + data.throttle * 1000;

					logger.log({
						level: 'debug',
						message: 'Sending deprecation warning'
					});

					sendDeprecationMessage(e, data, { matrixClient });
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
				data => {
					data = JSON.parse(data);

					logger.log({
						level: 'debug',
						message: 'Sending deprecation warning on join'
					});

					if (
						!(throttle[member.roomId] && throttle[member.roomId] > Date.now())
					) {
						sendDeprecationMessage(
							{ sender: { roomId: member.roomId } },
							data,
							{
								matrixClient
							}
						);
						throttle[member.roomId] = Date.now() + data.throttle * 1000;
					}

					if (data.invite) {
						inviteToTarget(member, data, { matrixClient });
					}
				},
				() => {
					logger.log({ level: 'debug', message: 'Room is not deprecated' });
				}
			);
		}
	});
};

export { init };
