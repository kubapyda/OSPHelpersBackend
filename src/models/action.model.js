import ActionCars from './action-cars.model';
import ActionFirefighters from './action-firefighters.model';
import Sequelize from 'sequelize';
import sequelize from './index';

const Action = sequelize.define('Action', {
	date: {
		type: Sequelize.DATE,
		allowNull: true
	},
	time: {
		type: Sequelize.DATE,
		allowNull: true
	},
	kind: {
		type: Sequelize.ENUM(
			'FIRE', 
			'COLLISION', 
			'EXERCISES', 
			'LOCAL_RISK', 
			'SEARCH_RESCUE', 
			'SECURITY', 
			'ACCIDENT', 
			'FALSE_ALARMS'
		),
		allowNull: true
	},
	eventAddress: {
		type: Sequelize.STRING,
		allowNull: true
	},
	reportNumber: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

Action.hasMany(ActionCars);
Action.hasMany(ActionFirefighters);

export default Action;

