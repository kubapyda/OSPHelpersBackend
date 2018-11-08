import LoginRoute from './login.route';

exports.plugin = {
	name: 'LoginModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(LoginRoute);
	}
};
