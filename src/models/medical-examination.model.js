import Firefighters from './firefighters.model';
import Sequelize from 'sequelize';
import sequelize from '.';

const MedicalExamination = sequelize.define('MedicalExamination', {
	medicalExaminationDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	endMedicalExaminationDate: {
		type: Sequelize.DATE,
		allowNull: true
	}
});

MedicalExamination.belongsTo(Firefighters, { foreignKey: 'FirefighterId' });

export default MedicalExamination;