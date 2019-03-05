import Cars from './cars.model';
import Firefighter from './firefighters.model';
import sequelize from './index';

const ActionFirefighters = sequelize.define('ActionFirefighters', {});

ActionFirefighters.belongsTo(Firefighter, {foreignKey: 'FirefighterId' });
ActionFirefighters.belongsTo(Cars, { foreignKey: 'CarId' });

export default ActionFirefighters;

