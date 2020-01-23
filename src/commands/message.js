const message = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		data => {
			data = JSON.parse(data);
			db.put(
				e.sender.roomId,
				JSON.stringify({
					...data,
					message: e.event.content.body.substring(19)
				})
			);

			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				'Room Deprecation Bot configuration updated',
				'<blockquote><p>Room Deprecation Bot configuration updated</p></blockquote>'
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

	logger.log({ level: 'debug', message: 'Executed set message' });
};

export default message;
