import MedicalExaminationRoute from './medical-examination.route';

exports.plugin = {
	name: 'MedicalExaminationModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(MedicalExaminationRoute);
	}
};
