import Sequelize from 'sequelize';
import config from '../../config.json';

const sequelize = new Sequelize(config.database, config.username, config.password, {
	dialect: config.dialect
});
	
export default sequelize;