import Hapi from "hapi";

const server = new Hapi.Server({
	host: 'localhost',
	port: 3333
});

server.route({
	method: "GET",
	path: "/",
	handler: (request, h) => {
		return "Hello World!";
	}
});

(async () => {
	try {
		await server.start();
	} catch (err) {
		console.error(err);
		throw err;
	}
	console.log(`Server started at ${server.info.uri}`);
})();
