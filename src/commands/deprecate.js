const defaultConfig = {
	invite: true,
	throttle: 600,
	message:
		'<h3><font color="red">This room is deprecated. Please join {{{roomLink}}} instead</font></h3>'
};

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

				matrixClient.sentHtmlMessage(
					e.sender.roomId,
					'This room is already configured for Room Deprecation Bot. To change the target room write !undeprecate',
					'<blockquote><p>This room is already configured for Room Deprecation Bot. To change the target room write <code>!undeprecate</code></p></blockquote>'
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
				db.put(
					e.sender.roomId,
					JSON.stringify({
						roomId: targetId,
						...defaultConfig
					})
				).then(() => {
					matrixClient.sendHtmlMessage(
						e.sender.roomId,
						'Room Deprecation Bot successfully configured. Next time someone joins, he will get auto invited. To cancel this action, type !undeprecate.',
						`<blockquote>
							<h5>&#x2714; Room Deprecation Bot successfully configured</h5>
							<p>Next time someone joins, he will get auto invited. To cancel this action, type <code>!undeprecate</code>. Write <code>!deprecate help</code> for more info.</p>
						</blockquote>`
					);

					matrixClient.sendHtmlMessage(
						targetId,
						`Room Deprecation Bot was configured for room ${e.sender.roomId} to route the users here!`,
						`<blockquote>
							<p>&#x27A1; Room Deprecation Bot was configured for room <a href="https://matrix.to/#/${e.sender.roomId}">${e.sender.roomId}</a> to route the users here!</p>
						</blockquote>`
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
						level: 'warn',
						message: `Failed to join room ${targetId}`
					});

					matrixClient.sendHtmlMessage(
						e.sender.roomId,
						`Could not configure Room Deprecation Bot.
						Please check the following:
						- The usage of the command is !deprecate <target room id>.
						- You have entered the ID (not the alias) of the target room correctly.
						- The target room is public or you have invited the bot there as well.
						For more info type: !deprecate help`,
						`<blockquote>
							<h5>&#x274C; Could not configure Room Deprecation Bot.</h5>
							<p>Please check the following:</p>
							<ul>
								<li>The usage of the command is <code>!deprecate &lt;target room id&gt;</code>.</li>
								<li>You have entered the ID (<b>not the alias</b>) of the target room correctly.</li>
								<li>The target room is public or you have invited the bot there as well.</li>
							<ul>
							<p>For more info type: <code>!deprecate help</code></p>
						</blockquote>`
					);
				}
			);
		}
	);
};

export default deprecate;
