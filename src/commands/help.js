const helpMessage = `
Room Deprecation Bot Usage
--------------------------
All the commands are placed under the !deprecate and !undeprecate namespaces.
You MUST use room ID everywhere. Aliases will not work.

Commands:
!deprecate <room ID> - redirect users from the current room to an other room. You need to execute this command before you could use any other features
!deprecate help - print this message
!deprecate get-config - print the current configuration
!deprecate message <message> - set the deprecation message. You can use HTML and mustache (https://mustache.github.io/)
    The following tags are available:
    {{currentRoomId}} - the ID of the current room
    {{roomId}} - the ID of the target room
    {{{roomLink}}} - a matrix.to link to the new room
!deprecate invite <true|false> - set if the bot will invite the users to this room or not
!deprecate throttle <time in seconds> - get the warning triggered only in every X seconds. Default: 600
!undeprecate - deregister room from deprecation bot

See more at: https://github.com/gergof/matrix-room-deprecation-bot
`;

const helpMessageHtml = `
<blockquote>
	<h5>Room Deprecation Bot Usage</h5>
	<hr/>
	<p>
		All the commands are placed under the <b>!deprecate</b> and <b>!undeprecate</b> namespaces.
		<br/>
		You MUST use room ID everywhere. Aliases will not work.
	</p>
	<br/>
	<p><b>Commands:</b></p>
	<ul>
		<li><code>!deprecate <room ID></code> - redirect users from the current room to an other room. You need to execute this command before you could use any other features</li>
		<li><code>!deprecate help</code> - print this message</li>
		<li><code>!deprecate get-config</code> - print the current configuration</li>
		<li>
			<code>!deprecate message <message></code> - set the deprecation message to message. You can use HTML and mustache (<a href="https://mustache.github.io/">mustache.github.io</a>)
			<blockquote>
				<p>The following tags are available:</p>
				<p>
					{{currentRoomId}} - the ID of the current room
					<br/>
					{{roomId}} - the ID of the target room
					<br/>
					{{{roomLink}}} - a matrix.to link to the new room
				</p>
			</blockquote>
		</li>
		<li><code>!deprecate invite <true|false></code> - set if the bot will invite the users to this room or not</li>
		<li><code>!deprecate throttle <time in seconds></code> - get the warning triggered only in every X seconds. Default: 600</li>
		<li><code>!undeprecate</code> - deregister room from deprecation bot</li>
	</ul>
	<br/>
	<p>See more at: <a href="https://github.com/gergof/matrix-room-deprecation-bot">github.com/gergof/matrix-room-deprecation-bot</a></p>
</blockquote>
`;

const help = (e, { matrixClient, logger }) => {
	matrixClient.sendHtmlMessage(e.sender.roomId, helpMessage, helpMessageHtml);

	logger.log({ level: 'debug', message: 'Executed help message' });
};

export default help;
