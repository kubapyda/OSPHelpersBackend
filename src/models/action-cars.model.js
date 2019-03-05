import Cars from './cars.model';
import Sequelize from 'sequelize';
import sequelize from './index';

const ActionCars = sequelize.define('ActionCars', {
	departureTime: {
		type: Sequelize.DATE,
		allowNull: true
	},
	arrivalTime: {
		type: Sequelize.DATE,
		allowNull: true
	},
	completeActivityTime: {
		type: Sequelize.DATE,
		allowNull: true
	},
	returnTime: {
		type: Sequelize.DATE,
		allowNull: true
	},
});

ActionCars.belongsTo(Cars, { foreignKey: 'CarId' });

export default ActionCars;

