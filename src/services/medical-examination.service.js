import * as _ from 'lodash';

import MedicalExamination from '../models/medical-examination.model';
import sequelize from '../models';

export default class MedicalExaminationService {

	static async createMedicalExaminationForFirefigter (data) {
		await sequelize.sync();
		return await MedicalExamination.create(data);
	}
    
	static async findMedicalExaminationForFirefighter (id) {
		await sequelize.sync();
		const medicalExamination = await MedicalExamination.findOne({
			where: {
				FirefighterId: id
			}
		});
		return medicalExamination;
	}

}
