import FirefightersController from './firefighters.controller';
import Joi from 'joi';

const firefightersController = new FirefightersController();
const schema = Joi.object().keys({
	name: Joi.string().required(),
	surname: Joi.string().required(),
	login: Joi.string().required(),
	gender: Joi.string().required().valid('MAN', 'WOMAN'),
	birthdayDate: Joi.date().required(),
	entryDate: Joi.date().required(),
	type: Joi.string().required().valid('JOT', 'MDP', 'MEMBER')
});

export default [
	{
		path: '/api/firefighters',
		method: 'GET',
		config: {
			handler: firefightersController.find,
			tags: ['api'],
			description: 'Find all Firefighters in system.',
			notes: 'Return all the firefighters from system.'
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'GET',
		config: {
			handler: firefightersController.findOne,
			tags: ['api'],
			description: 'Find Firefighters in system by id.',
			notes: 'Return a single firefighters from system.',
			validate: {
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/firefighters',
		method: 'POST',
		config: {
			handler: firefightersController.create,
			tags: ['api'],
			description: 'Create new firefighter in system.',
			notes: 'Return newly created firefighter.',
			validate: {
				payload: schema
			}
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'PUT',
		config: {
			handler: firefightersController.update,
			tags: ['api'],
			description: 'Update information about firefighter in system.',
			notes: 'Return updated firefighter.',
			validate: {
				payload: schema,
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'DELETE',
		config: {
			handler: firefightersController.delete,
			tags: ['api'],
			description: 'Delete firefighters by id from system.',
			notes: 'Return a deleted message.',
			validate: {
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
];
