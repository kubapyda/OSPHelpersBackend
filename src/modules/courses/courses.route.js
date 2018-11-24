import { AdminRole, headerValid } from '../../constants/constants';

import CoursesController from './courses.controller';
import Joi from 'joi';

const coursesController = new CoursesController();
const schema = Joi.object().keys({
	courseType: Joi.string().required().valid(
		'BASIC',
		'TECHNICAL_RESCUE',
		'FIRST_AID',
		'WATER_RESCUE',
		'HARDWARE_CONSERVATOR',
		'CHEMICAL_AND_ECOLOGICAL_RESCUE',
		'ALTITUDE_RESCUE',
		'SERVICE_CAR_WITH_LIFT',
		'SERVICE_CAR_WITH_LADY',
		'SEARCH_AND_RESCUE',
		'COMMANDERS',
		'WARDROBES',
		'COMMUNES_COMMANDER'
	),
	courseCompletitionDate: Joi.date().required(),
	courseValidityEnd: Joi.date().allow(null),
	FirefighterId: Joi.number().integer().required()
});

export default [
	{
		path: '/api/courses',
		method: 'GET',
		options: {
			handler: coursesController.find,
			tags: ['api'],
			description: 'Find all Firefighters of type "JOT" in system and they courses.',
			notes: 'Return all the firefighters of type "JOT" and they courses from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/courses',
		method: 'POST',
		options: {
			handler: coursesController.create,
			tags: ['api'],
			description: 'Create new course for firefighter in system.',
			notes: 'Return newly created course for Firefighters.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				payload: schema
			}
		}
	},
	{
		path: '/api/courses/{id}/{type}',
		method: 'GET',
		options: {
			handler: coursesController.findFirefighterCourse,
			tags: ['api'],
			description: 'Retun course for firefighter with history in system.',
			notes: 'Return course for Firefighter.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					id: Joi.number().integer().required(),
					type: Joi.string().required()
				}),
				failAction: (reuquest, h, err) => {
					console.log(err);
				}
			}
		}
	}
];
