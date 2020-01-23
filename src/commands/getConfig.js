import Mustache from 'mustache';

const configMessage = `
Room Deprecation Bot Configuration
---------------------
{{#disabled}}
Room Deprecation Bot is not activated for this room
{{/disabled}}
{{^disabled}}
Current room: {{currentRoomId}}
Redirect to: {{roomId}}
Invite users to target: {{invite}}
Throttle: {{throttle}} seconds
Deprecation message: {{message}}
{{/disabled}}
`;

const configMessageHtml = `
<blockquote>
	<h5>Room Deprecation Bot Configuration</h5>
	<hr/>
	{{#disabled}}
	<p>Room Deprecation Bot is not activated for this room.</p>
	{{/disabled}}
	{{^disabled}}
	<p>
		Current room: <code>{{currentRoomId}}</code>
		<br/>
		Redirect to: <code>{{roomId}}</code>
		<br/>
		Invite users to target: <code>{{invite}}</code>
		<br/>
		Throttle: <code>{{throttle}} seconds</code>
		<br/>
		Deprecation message: <code>{{message}}</code>
	</p>
	{{/disabled}}
</blockquote>
`;

const getConfig = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		data => {
			data = JSON.parse(data);
			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				Mustache.render(configMessage, {
					currentRoomId: e.sender.roomId,
					...data
				}),
				Mustache.render(configMessageHtml, {
					currentRoomId: e.sender.roomId,
					...data,
					message: data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
				})
			);
		},
		() => {
			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				Mustache.render(configMessage, { disabled: true }),
				Mustache.render(configMessageHtml, { disabled: true })
			);
		}
	);

	logger.log({ level: 'debug', message: 'Executed get config' });
};

export default getConfig;
