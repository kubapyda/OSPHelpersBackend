import Sequelize from 'sequelize';
import sequelize from './index';

const EquipmentItem = sequelize.define('EquipmentItem', {
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	approvalDate: {
		type: Sequelize.DATE,
		allowNull: true
	}
});

export default EquipmentItem;

