import { AdminRole, headerValid } from '../../constants/constants';

import FirefightersController from './firefighters.controller';
import Joi from 'joi';

const firefightersController = new FirefightersController();
const schema = Joi.object().keys({
	name: Joi.string().required(),
	surname: Joi.string().required(),
	login: Joi.string().required(),
	gender: Joi.string().required().valid('MAN', 'WOMAN'), 
	courseCompletitionDate: Joi.date().when('type', { is: 'JOT', then: Joi.required() }),
	courseValidityEnd: Joi.date().when('type', { is: 'JOT', then: Joi.required() }),
	medicalExaminationDate: Joi.date().when('type', { is: 'JOT', then: Joi.required() }),
	endMedicalExaminationDate: Joi.date().when('type', { is: 'JOT', then: Joi.required() }),
	birthdayDate: Joi.date().required(),
	entryDate: Joi.date().required(),
	type: Joi.string().required().valid('JOT', 'MDP', 'MEMBER'),
	role: Joi.string().required().valid('ADMIN', 'USER')
});

export default [
	{
		path: '/api/firefighters',
		method: 'GET',
		options: {
			handler: firefightersController.find,
			tags: ['api'],
			description: 'Find all Firefighters in system.',
			notes: 'Return all the firefighters from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/firefighters/minimal/{type}',
		method: 'GET',
		options: {
			handler: firefightersController.findMinimal,
			tags: ['api'],
			description: 'Find all Firefighters in system with minimal data.',
			notes: 'Return minimal list of all of the firefighters from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					type: Joi.string().required().valid('JOT', 'MDP', 'MEMBER')
				})
			}
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'GET',
		options: {
			handler: firefightersController.findOne,
			tags: ['api'],
			description: 'Find Firefighters in system by id.',
			notes: 'Return a single firefighters from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/firefighters',
		method: 'POST',
		options: {
			handler: firefightersController.create,
			tags: ['api'],
			description: 'Create new firefighter in system.',
			notes: 'Return newly created firefighter.',
			plugins: AdminRole,
			validate: {
				payload: schema,
				headers: headerValid
			}
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'PUT',
		options: {
			handler: firefightersController.update,
			tags: ['api'],
			description: 'Update information about firefighter in system.',
			notes: 'Return updated firefighter.',
			plugins: AdminRole,
			validate: {
				payload: schema,
				headers: headerValid,
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'DELETE',
		options: {
			handler: firefightersController.delete,
			tags: ['api'],
			description: 'Delete firefighters by id from system.',
			notes: 'Return a deleted message.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
];
