import CarsRoute from './cars.route';

exports.plugin = {
	name: 'CarsModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(CarsRoute);
	}
};
