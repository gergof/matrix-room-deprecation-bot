import Level from 'level';

let Db;

const init = ({ logger }) => {
	return new Promise((resolve, reject) => {
		logger.log({ level: 'info', message: 'Opening LevelDB' });
		Level(
			process.env.NODE_ENV == 'production' ? '/data/db' : 'db',
			(err, db) => {
				if (err) {
					logger.log({ level: 'error', message: 'Can not open LevelDB' });
					reject(err);
				}

				Db = db;
				resolve(db);
			}
		);
	});
};

export { init };
export default Db;
