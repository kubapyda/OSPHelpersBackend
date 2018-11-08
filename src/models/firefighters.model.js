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
	login: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	gender: {
		type: Sequelize.ENUM('MAN', 'WOMAN'),
		allowNull: true
	},
	birthdayDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	entryDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	type: {
		type: Sequelize.ENUM('JOT', 'MDP', 'MEMBER'),
		allowNull: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true
	},
	role: {
		type: Sequelize.ENUM('USER', 'ADMIN'),
		allowNull: true
	},
	firstLogin: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	}
});

export default Firefighters;

