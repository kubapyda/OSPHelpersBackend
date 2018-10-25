import * as _ from 'lodash';

import Boom from 'boom';
import CoursesService from '../../services/courses.service';
import Firefighters from '../../models/firefighters.model';
import MedicalExaminationService from '../../services/medical-examination.service';
import sequelize from '../../models/index';

export default class FirefightersController {

	async find (request) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 12;
		const offset = size * (page - 1);
		return {
			totalCount: await Firefighters.count(),
			data: await Firefighters.findAll({
				limit: size,
				offset: offset
			})
		};
	}

	async findOne (request) {
		const firefighter = await Firefighters.findOne({
			where: {
				id: request.params.id
			}
		});
		if (!firefighter) {
			return Boom.notFound();
		}
		const course = await CoursesService.findCourse(request.params.id);
		const medicalExamination = await MedicalExaminationService.findMedicalExaminationForFirefighter(request.params.id);
		return _.assign(
			_.pick(firefighter, ['id', 'name', 'surname', 'login', 'gender', 'birthdayDate', 'entryDate', 'type']),
			_.pick(course, ['courseCompletitionDate']),
			_.pick(medicalExamination, ['medicalExaminationDate'])
		);
	}

	async findMinimal (request) {
		const firefightersMinimal = await Firefighters.findAll({ 
			where: { type: request.params.type },
			attributes: ['id', 'name', 'surname']
		}).map(firefighter => {
			return {
				id: firefighter.id,
				value: `${firefighter.name} ${firefighter.surname}`
			};
		});
		return firefightersMinimal;
	}

	async create (request) {
		let password = 'qwerty';
		await sequelize.sync();
		const firefighter = await Firefighters.create(
			_.assignIn(
				_.pick(request.payload, ['name', 'surname', 'login', 'gender', 'birthdayDate', 'entryDate', 'type']),
				{ password: password }
			)
		);
		if (request.payload.type === 'JOT') {
			const firefighterBasicCourse = {
				courseType: 'BASIC',
				courseCompletitionDate: request.payload.courseCompletitionDate,
				courseValidityEnd: request.payload.courseValidityEnd,
				FirefighterId: firefighter.id
			};
			await CoursesService.createCourse(firefighterBasicCourse);
			const firefighterMedicalExamination = {
				medicalExaminationDate: request.payload.medicalExaminationDate,
				endMedicalExaminationDate: request.payload.endMedicalExaminationDate,
				FirefighterId: firefighter.id
			};
			await MedicalExaminationService.createMedicalExaminationForFirefigter(firefighterMedicalExamination);
		}
		return firefighter;
	}

	async update (request) {
		await Firefighters.update(request.payload, {
			where: {
				id: request.params.id
			}
		});
		return await Firefighters.findOne({
			where: {
				id: request.params.id
			}
		});
	}
	
	async delete (request) {
		const firefighter = await Firefighters.destroy({
			where: {
				id: request.params.id
			}
		});
		if (!firefighter) {
			return Boom.badRequest();
		}
		return {
			message: `Removed Firefighter with id: ${request.params.id}`
		};
	}

}
	