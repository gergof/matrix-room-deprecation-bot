import Dotenv from 'dotenv';

if (
	!process.env.MATRIX_SERVER ||
	!process.env.MATRIX_USER ||
	!process.env.MATRIX_TOKEN
) {
	if (process.env.NODE_ENV == 'production') {
		Dotenv.config({ path: '/data/.env' });
	} else {
		Dotenv.config();
	}
}

const config = {
	matrix: {
		server: process.env.MATRIX_SERVER,
		user: process.env.MATRIX_USER,
		token: process.env.MATRIX_TOKEN
	}
};

export default config;
