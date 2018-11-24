import Firefighters from './firefighters.model';
import Sequelize from 'sequelize';
import sequelize from '.';

const Courses = sequelize.define('Courses', {
	courseType: {
		type: Sequelize.ENUM(
			'BASIC',
			'TECHNICAL_RESCUE',
			'FIRST_AID',
			'WATER_RESCUE',
			'HARDWARE_CONSERVATOR',
			'CHEMICAL_AND_ECOLOGICAL_RESCUE',
			'ALTITUDE_RESCUE',
			'SERVICE_CAR_WITH_LIFT',
			'SERVICE_CAR_WITH_LADY',
			'SEARCH_AND_RESCUE',
			'COMMANDERS',
			'WARDROBES',
			'COMMUNES_COMMANDER'
		),
		allowNull: true
	},
	courseCompletitionDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	courseValidityEnd: {
		type: Sequelize.DATE,
		allowNull: true
	}
});

Courses.belongsTo(Firefighters, { foreignKey: 'FirefighterId' });

export default Courses;