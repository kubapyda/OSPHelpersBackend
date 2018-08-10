import Hapi from 'hapi';
import Plugins from './plugins/plugins';

const server = new Hapi.Server({
	host: 'localhost',
	port: 3333,
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
    }
});

(async () => {
	try {
		await server.register(Plugins);
		await server.start();
	} catch (err) {
		console.error(err);
		throw err;
	}
	console.log(`Server started at ${server.info.uri}`);
})();
