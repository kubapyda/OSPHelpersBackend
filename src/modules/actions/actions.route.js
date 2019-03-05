import { AdminRole, headerValid } from '../../constants/constants';

import ActionsController from './actions.controller';
import Joi from 'joi';

const actionsController = new ActionsController();
const schema = Joi.object().keys({
	date: Joi.date().required(),
	time: Joi.date().required(),
	kind: Joi.string().required().valid(
		'FIRE',
		'COLLISION',
		'EXERCISES',
		'LOCAL_RISK',
		'SEARCH_RESCUE',
		'SECURITY',
		'ACCIDENT',
		'FALSE_ALARMS'),
	eventAddress: Joi.string().required(),
	reportNumber: Joi.string().required(),
	equipmentItems: Joi.array().optional(),
	cars: Joi.array().items(Joi.object().keys({
		departureTime: Joi.date().required(),
		arrivalTime: Joi.date().required(),
		completeActivityTime: Joi.date().required(),
		returnTime: Joi.date().required(),
		car: Joi.number().integer().required()
	})).required(),
	firefighters: Joi.array().items(Joi.object().keys({
		id: Joi.number().integer().required(),
		value: Joi.string().optional(),
		car: Joi.number().integer().required()
	})).required()
});

export default [
	{
		path: '/api/actions',
		method: 'GET',
		options: {
			handler: actionsController.find,
			tags: ['api'],
			description: 'Find all actions in system.',
			notes: 'Return all actions from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/actions',
		method: 'POST',
		options: {
			handler: actionsController.create,
			tags: ['api'],
			description: 'Create new action in system.',
			notes: 'Return newly created action.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				payload: schema,
				failAction: (request, h, err) => {
					console.log(err);
					throw err;
				}
			}
		}
	},
];
