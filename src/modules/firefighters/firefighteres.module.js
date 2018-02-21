import FirefightersRoute from './firefighters.route';

exports.plugin = {
	name: 'FirefightersModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(FirefightersRoute);
	}
};
