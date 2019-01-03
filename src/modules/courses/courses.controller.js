import * as _ from 'lodash';

import Boom from 'boom';
import Cars from '../../models/cars.model';
import Courses from '../../models/courses.model';
import CoursesService from '../../services/courses.service';
import Firefighters from '../../models/firefighters.model';
import sequelize from '../../models';

export default class CoursesController {

	async find () {
		await sequelize.sync();
		const mapedCourses = [];
		await Courses.findAll({
			attributes: ['id', 'courseType', 'courseCompletitionDate', 'courseValidityEnd'],
			include: [{
				model: Firefighters,
				attributes: ['id', 'name', 'surname']
			}]
		}).map((course) => {
			const firefighterIdx = _.findIndex(mapedCourses, { id: course.Firefighter.id });
			const parsedCourse = CoursesService.setCourseStatus(course);
			if (firefighterIdx === -1) {
				const firefighter = {
					id: course.Firefighter.dataValues.id,
					name: `${course.Firefighter.dataValues.name} ${course.Firefighter.dataValues.surname}`
				};
				mapedCourses.push(_.assign(firefighter, parsedCourse));
			} else {
				mapedCourses[firefighterIdx] = _.assignIn(mapedCourses[firefighterIdx], parsedCourse);
			}
		});
		
		return {
			totalCount: await Firefighters.count({ where: { type: 'JOT' }}),
			data: mapedCourses
		};
	}

	async findFirefighterCourse (request) {
		await sequelize.sync();
		return await Courses.findAll({
			attributes: ['id', 'courseCompletitionDate', 'courseValidityEnd'],
			where: {
				FirefighterId: request.params.id,
				courseType: request.params.type
			}
		});
	}

	async create (request) {
		return await CoursesService.createCourse(request.payload);
	}

}
