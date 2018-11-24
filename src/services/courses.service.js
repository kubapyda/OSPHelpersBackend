import * as _ from 'lodash';

import Courses from '../models/courses.model';
import sequelize from '../models';

export default class CoursesService {

	static async createCourse (data) {
		await sequelize.sync();
		return await Courses.create(data);
	}
    
	static async findCourse (id) {
		await sequelize.sync();
		const courses = await Courses.findOne({
			where: {
				FirefighterId: id
			}
		});
		return courses;
	}

	static setCourseStatus (course) {
		const toCourseValidityEnd = Math.floor(((((course.courseValidityEnd - new Date()) / 1000) / 60) / 60) / 24);
		const parsedCourse = {};
		if (toCourseValidityEnd > 60 || _.isNull(course.courseValidityEnd)) {
			parsedCourse[course.courseType] = 'COURSE_ACTUAL';
		} else if (toCourseValidityEnd > 14 && toCourseValidityEnd <= 60) {
			parsedCourse[course.courseType] = 'COURSE_WARN';
		} else if (toCourseValidityEnd >= 0 && toCourseValidityEnd <= 14) {
			parsedCourse[course.courseType] = 'COURSE_ERROR';
		} else if (toCourseValidityEnd < 0) {
			parsedCourse[course.courseType] = 'COURSE_NOT_ACTUAL';
		}
		return parsedCourse;
	}

}
