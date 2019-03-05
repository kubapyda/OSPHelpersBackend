import ActionsRoute from './actions.route';

exports.plugin = {
	name: 'ActionsModule',
	pkg: require('../../../package.json'),
	register: (server) => {
		server.route(ActionsRoute);
	}
};
