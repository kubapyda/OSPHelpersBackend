import Firefighters from './firefighters.model';
import Sequelize from 'sequelize';
import sequelize from '.';

const Payments = sequelize.define('Payments', {
	paidYear: {
		type: Sequelize.INTEGER,
		allowNull: true
	}
});

Payments.belongsTo(Firefighters, { foreignKey: 'FirefighterId' });

export default Payments;