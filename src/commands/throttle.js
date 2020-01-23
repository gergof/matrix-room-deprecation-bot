const throttle = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		data => {
			data = JSON.parse(data);
			const newValue = +e.event.content.body.split(' ')[2];

			db.put(
				e.sender.roomId,
				JSON.stringify({
					...data,
					throttle: newValue
				})
			);

			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				'Room Deprecation Bot configuration updated. Throttle set to ' +
					newValue,
				'<blockquote><p>Room Deprecation Bot configuration updated</p><p>Throttle = <code>' +
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

	logger.log({ level: 'debug', message: 'Executed set throttle' });
};

export default throttle;
