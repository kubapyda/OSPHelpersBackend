import Sequelize from 'sequelize';
import config from '../../config.json';

const sequelize = new Sequelize(config.database, config.username, config.password, {
	dialect: config.dialect
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
	
export default sequelize;