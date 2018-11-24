import CoursesRoute from './courses.route';

exports.plugin = {
	name: 'CoursesModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(CoursesRoute);
	}
};
