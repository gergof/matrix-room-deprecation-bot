import Dotenv from 'dotenv';
import path from 'path';

let env;
if (
	process.env.MATRIX_SERVER &&
	process.env.MATRIX_USER &&
	process.env.MATRIX_TOKEN
) {
	env = {
		MATRIX_SERVER: process.env.MATRIX_SERVER,
		MATRIX_USER: process.env.MATRIX_USER,
		MATRIX_TOKEN: process.env.MATRIX_TOKEN
	};
} else {
	if (process.env.NODE_ENV == 'production') {
		env = Dotenv.config({ path: '/data/.env' });
	} else {
		env = Dotenv.config().parsed;
	}
}

const config = {
	matrix: {
		server: env.MATRIX_SERVER,
		user: env.MATRIX_USER,
		token: env.MATRIX_TOKEN
	}
};

export default config;
