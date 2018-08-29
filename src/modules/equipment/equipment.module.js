import EquipmentRoute from './equipment.route';

exports.plugin = {
	name: 'EquipmentModule',
	pkg: require('../../../package.json'),
	register: (server, options) => {
		server.route(EquipmentRoute);
	}
};
