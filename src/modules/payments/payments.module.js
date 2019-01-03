import PaymentsRoute from './payments.route';

exports.plugin = {
	name: 'PaymentsModule',
	pkg: require('../../../package.json'),
	register: (server) => {
		server.route(PaymentsRoute);
	}
};
