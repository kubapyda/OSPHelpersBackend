import Sequelize from 'sequelize';
import sequelize from './index';

const Cars = sequelize.define('Cars', {
	mark: {
		type: Sequelize.STRING,
		allowNull: true
	},
	model: {
		type: Sequelize.STRING,
		allowNull: true
	},
	registrationNumber: {
		type: Sequelize.STRING,
		allowNull: true
	},
	productionDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	operationNumber: {
		type: Sequelize.STRING,
		allowNull: true
	},
	taskCar: {
		type: Sequelize.ENUM('FIREFIGHTING', 'SPECIAL'),
		allowNull: true
	},
	carWeight: {
		type: Sequelize.ENUM('LIGHT', 'MEDIUM', 'HEAVY'),
		allowNull: true
	},
	technicalExaminationDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	insuranceDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	specialCarsPurpose: {
		type: Sequelize.ENUM(
			'LADDER',
			'HYDRAULIC_JACK',
			'ROAD_RESCUE',
			'TECHNICAL_RESCUE',
			'CHEMICAL_RESCUE',
			'ENVIRONMENTAL_RESCUE',
			'WATER_RESCUE',
			'LIFESAVING',
			'CRANE',
			'OPERATING',
			'COMMAND_AND_COMMUNICATION',
			'SERPENTINE',
			'MEDICAL',
			'AN_ANTI',
			'QUARTERMASTER'
		),
		allowNull: true
	},
	extinguishingEquipment: {
		type: Sequelize.ENUM(
			'AUTOPOMPE',
			'MOTOPOMPA',
			'EXTINGUISHING_POWDER',
			'SNOW INSTALLATION'
		),
		allowNull: true
	}
});

export default Cars;

