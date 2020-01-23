const undeprecate = (e, { matrixClient, db, logger }) => {
	db.get(e.sender.roomId).then(
		() => {
			logger.log({
				level: 'info',
				message: `Disabled deprecation handler for ${e.sender.roomId}`
			});

			db.del(e.sender.roomId).then(() => {
				matrixClient.sendHtmlMessage(
					e.sender.roomId,
					'Successfully disabled Room Deprecation Bot',
					`<blockquote>
						<h5>&#x1F4F4; Successfully disabled Room Deprecation Bot</h5>
						<p>You can type <code>!deprecate &lt;target room id&gt;</code> to re-enable it.</p>
					</blockquote>`
				);
			});
		},
		() => {
			matrixClient.sendHtmlMessage(
				e.sender.roomId,
				'Deprecation Bot not enabled for this room. Type !deprecate <target room id> to enable it!',
				'<blockquote><p>Deprecation Bot not enabled for this room. Type <code>!deprecate &lt;target room id&gt;</code> to enable it!</p></blockquote>'
			);
		}
	);
};

export default undeprecate;
