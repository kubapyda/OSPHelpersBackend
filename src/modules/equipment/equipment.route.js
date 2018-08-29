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
		config: {
			handler: equipmentController.find,
			tags: ['api'],
			description: 'Find all equipment items in system.',
			notes: 'Return all the equipment items from system.'
		}
	},
	{
		path: '/api/equipment/{id}',
		method: 'GET',
		config: {
			handler: equipmentController.findOne,
			tags: ['api'],
			description: 'Find equipment item in system by id.',
			notes: 'Return a single equipment item from system.',
			validate: {
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/equipment',
		method: 'POST',
		config: {
			handler: equipmentController.create,
			tags: ['api'],
			description: 'Create new equipment item in system.',
			notes: 'Return newly created equipment item.',
			validate: {
				payload: schema
			}
		}
	},
	{
		path: '/api/equipment/{id}',
		method: 'PUT',
		config: {
			handler: equipmentController.update,
			tags: ['api'],
			description: 'Update information about equipment item in system.',
			notes: 'Return updated equipment item.',
			validate: {
				payload: schema,
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/equipment/{id}',
		method: 'DELETE',
		config: {
			handler: equipmentController.delete,
			tags: ['api'],
			description: 'Delete equipment item by id from system.',
			notes: 'Return a deleted message.',
			validate: {
				params: Joi.object().keys({
					id: Joi.number().required()
				})
			}
		}
	},
];
