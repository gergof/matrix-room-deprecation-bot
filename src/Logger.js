import Winston from 'winston';

const logger = Winston.createLogger({
	level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',
	format: Winston.format.combine(
		Winston.format.timestamp(),
		Winston.format.colorize({
			colors: { info: 'blue', error: 'red' },
			message: false
		}),
		Winston.format.padLevels(),
		Winston.format.printf(
			info =>
				`[${info.timestamp}] [${info.level}] [${info.group}] ${info.message}`
		)
	),
	transports:
		process.env.NODE_ENV == 'production'
			? [
					new Winston.transports.File({
						filename: '/data/deprecationbot.log',
						maxsize: 10485760,
						maxFiles: 10,
						tailable: true
					}),
					new Winston.transports.Console()
			  ]
			: [new Winston.transports.Console()]
});

const getLogger = group => {
	return logger.child({ group: group });
};

export { getLogger };
export default logger;
