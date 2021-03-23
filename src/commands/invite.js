const invite = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		data => {
			data = JSON.parse(data);
			const newValue = e.event.content.body.split(' ')[2] == 'true';

			db.put(
				e.sender.roomId,
				JSON.stringify({
					...data,
					invite: newValue
				})
			);

			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				'Room Deprecation Bot configuration updated. Invite set to ' + newValue,
				'<blockquote><p>Room Deprecation Bot configuration updated</p><p>Invite = <code>' +
					newValue +
					'</code></p></blockquote>'
			);
		},
		() => {
			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				'Room Deprecation Bot not configured for this room',
				'<blockquote><p>Room Deprecation Bot not configured for this room</p></blockquote>'
			);
		}
	);

	logger.log({ level: 'debug', message: 'Executed set invite' });
};

export default invite;
