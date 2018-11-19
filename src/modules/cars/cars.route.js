import { AdminRole, headerValid } from '../../constants/constants';

import CarsController from './cars.controller';
import Joi from 'joi';

const carsController = new CarsController();
const schema = Joi.object().keys({
	mark: Joi.string().required(),
	model: Joi.string().required(),
	registrationNumber: Joi.string().required(),
	productionDate: Joi.date().required(),
	operationNumber: Joi.string().required(),
	taskCar: Joi.string().required().valid('FIREFIGHTING', 'SPECIAL'),
	carWeight: Joi.string().required().valid('LIGHT', 'MEDIUM', 'HEAVY'),
	technicalExaminationDate: Joi.date().required(),
	insuranceDate: Joi.date().required(),
	specialCarsPurpose: Joi.string()
		.valid(
			'LADDER',
			'HYDRAULIC_JACK',
			'ROAD_RESCUE',
			'TECHNICAL_RESCUE',
			'CHEMICAL_RESCUE',
			'ENVIRONMENTAL_RESCUE',
			'WATER_RESCUE',
			'LIFESAVING',
			'CRANE',
			'OPERATING',
			'COMMAND_AND_COMMUNICATION',
			'SERPENTINE',
			'MEDICAL',
			'AN_ANTI',
			'QUARTERMASTER'
		)
		.when('taskCar', { is: 'SPECIAL', then: Joi.required() }),
	extinguishingEquipment: Joi.string()
		.valid('AUTOPOMPE', 'MOTOPOMPA', 'EXTINGUISHING_POWDER', 'SNOW_INSTALLATION')
		.when('taskCar', { is: 'FIREFIGHTING', then: Joi.required() })
});

export default [
	{
		path: '/api/cars',
		method: 'GET',
		options: {
			handler: carsController.find,
			tags: ['api'],
			description: 'Find all Cars in system.',
			notes: 'Return all the cars from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/cars/{id}',
		method: 'GET',
		options: {
			handler: carsController.findOne,
			tags: ['api'],
			description: 'Find Car in system by id.',
			notes: 'Return a single car from system.',
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
		path: '/api/cars/minimal',
		method: 'GET',
		options: {
			handler: carsController.findMinimal,
			tags: ['api'],
			description: 'Find minimal version of all cars in system.',
			notes: 'Return all cars from system in minimal form.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/cars',
		method: 'POST',
		options: {
			handler: carsController.create,
			tags: ['api'],
			description: 'Create new car in system.',
			notes: 'Return newly created car.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				payload: schema
			}
		}
	},
	{
		path: '/api/cars/{id}',
		method: 'PUT',
		options: {
			handler: carsController.update,
			tags: ['api'],
			description: 'Update information about car in system.',
			notes: 'Return updated car.',
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
		path: '/api/cars/{id}',
		method: 'DELETE',
		options: {
			handler: carsController.delete,
			tags: ['api'],
			description: 'Delete car by id from system.',
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
