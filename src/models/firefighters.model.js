import Sequelize from 'sequelize';
import sequelize from './index';

const Firefighters = sequelize.define('Firefighters', {
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	surname: {
		type: Sequelize.STRING,
		allowNull: true
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

export default Firefighters;

