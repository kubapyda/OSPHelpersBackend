import { AdminRole, headerValid } from '../../constants/constants';

import EquipmentController from './equipment.controller';
import Joi from 'joi';

const equipmentController = new EquipmentController();
const schema = Joi.object().keys({
	name: Joi.string().required(),
	approvalDate: Joi.date().required()
});

export default [
	{
		path: '/api/equipment',
		method: 'GET',
		options: {
			handler: equipmentController.find,
			tags: ['api'],
			description: 'Find all equipment items in system.',
			notes: 'Return all the equipment items from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/equipment/{id}',
		method: 'GET',
		options: {
			handler: equipmentController.findOne,
			tags: ['api'],
			description: 'Find equipment item in system by id.',
			notes: 'Return a single equipment item from system.',
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
		path: '/api/equipment/minimal',
		method: 'GET',
		options: {
			handler: equipmentController.findMinimal,
			tags: ['api'],
			description: 'Find equipment items in system with minimal data.',
			notes: 'Return a equipment items from system with minimal data.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/equipment',
		method: 'POST',
		options: {
			handler: equipmentController.create,
			tags: ['api'],
			description: 'Create new equipment item in system.',
			notes: 'Return newly created equipment item.',
			plugins: AdminRole,
			validate: {
				payload: schema,
				headers: headerValid
			}
		}
	},
	{
		path: '/api/equipment/{id}',
		method: 'PUT',
		options: {
			handler: equipmentController.update,
			tags: ['api'],
			description: 'Update information about equipment item in system.',
			notes: 'Return updated equipment item.',
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
		path: '/api/equipment/{id}',
		method: 'DELETE',
		options: {
			handler: equipmentController.delete,
			tags: ['api'],
			description: 'Delete equipment item by id from system.',
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
