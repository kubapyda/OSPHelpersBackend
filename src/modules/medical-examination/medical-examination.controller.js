import * as _ from 'lodash';

import Boom from 'boom';
import Firefighters from '../../models/firefighters.model';
import MedicalExamination from '../../models/medical-examination.model';
import MedicalExaminationService from '../../services/medical-examination.service';
import sequelize from '../../models/index';

export default class MedicalExaminationController {

	async find (request) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 12;
		const offset = size * (page - 1);
		const medicalExaminations = await MedicalExamination.findAll({
			limit: size,
			offset: offset,
			attributes: [
				[sequelize.fn('max', sequelize.col('MedicalExamination.id')), 'meid'],
				[sequelize.fn('max', sequelize.col('medicalExaminationDate')), 'medicalExaminationDate'],
				[sequelize.fn('max', sequelize.col('endMedicalExaminationDate')), 'endMedicalExaminationDate'],
			],
			group: ['FirefighterId', 'Firefighter.id'],
			include: [{
				model: Firefighters,
				attributes: [
					'id', 'name', 'surname'
				]
			}]
		}).map((medicalExamination) => {
			return {
				id: medicalExamination.id,
				medicalExaminationDate: medicalExamination.medicalExaminationDate,
				endMedicalExaminationDate: medicalExamination.endMedicalExaminationDate,
				firefighter: {
					id: medicalExamination.Firefighter.id,
					name: `${medicalExamination.Firefighter.name} ${medicalExamination.Firefighter.surname}`
				}
			};
		});
		console.log(_.size(medicalExaminations));
		return {
			totalCount: await Firefighters.count({ where: { type: 'JOT' }}),
			data: medicalExaminations
		};
	}

	async findForOneFirefighter (request) {
		const firefighterMedicalExamination = await MedicalExamination.findAll({
			attributes: ['id', 'medicalExaminationDate', 'endMedicalExaminationDate'],
			where: {
				FirefighterId: request.params.firefighterId
			}
		});
		if (!firefighterMedicalExamination) {
			return Boom.notFound();
		}
		return firefighterMedicalExamination;
	}

	async createMedicalExaminationForFirefigter (request) {
		return await MedicalExaminationService.createMedicalExaminationForFirefigter(request.payload);
	}

}
	