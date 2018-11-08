import Hapi from 'hapi';
import JwtService from './services/jwt.service';
import Plugins from './plugins/plugins';
import configPassword from '../config-password';

const server = new Hapi.Server({
	host: 'localhost',
	port: 3333,
	routes: {
		cors: {
			origin: ["*"],
			headers: ["Accept", "Content-Type", "authorization"],
			credentials: true,
			additionalHeaders: ["X-Requested-With"]
		}
	}
});

(async () => {
	try {
		await server.register(Plugins);
		await server.start();
		const validate = JwtService.validate;
		server.auth.strategy('jwt', 'jwt', {
			key: configPassword.SECRET_KEY,
			validate,
			verifyOptions: {
				algorithm: ['HS256']
			}
		});

		server.auth.default('jwt');
		
	} catch (err) {
		console.error(err);
		throw err;
	}
	console.log(`Server started at ${server.info.uri}`);
})();
