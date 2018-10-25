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
            whre: {
                FirefighterId: id
            }
        });
        return courses;
    }

}
