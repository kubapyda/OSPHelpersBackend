import * as _ from 'lodash';

import Action from '../../models/action.model';
import ActionCars from '../../models/action-cars.model';
import ActionFirefighters from '../../models/action-firefighters.model';
import Cars from '../../models/cars.model';
import Firefighters from '../../models/firefighters.model';
import sequelize from '../../models/index';

export default class ActionsController {

	async find (request, h) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 5;
		const offset = size * (page - 1);
		return await Action.findAll({
			attributes: ['id', 'kind', 'date', 'time', 'eventAddress'],
			include: [{
				attributes: ['FirefighterId'],
				model: ActionFirefighters,
				include: [{
					attributes: ['name', 'surname'],
					model: Firefighters
				}, {
					attributes: ['mark', 'model'],
					model: Cars
				}]
			}, {
				attributes: ['CarId'],
				model: ActionCars,
				include: [{
					attributes: ['mark', 'model'],
					model: Cars
				}]
			}]
		}).map((actionData) => {
			return _.assign(
				_.pick(actionData, ['id', 'date', 'time', 'kind', 'eventAddress']),
				{
					firefighters: actionData.ActionFirefighters.map((firefighterData) => {
						return `${firefighterData.Firefighter.name} ${firefighterData.Firefighter.surname}`;
					}),
					cars: actionData.ActionCars.map(carData => {
						return `${carData.Car.mark} ${carData.Car.model}`;
					})
				}
			);
		});
		
	}

	async create (request, h) {
		await sequelize.sync();
		const action = await Action.create(_.pick(request.payload, ['date', 'time', 'kind', 'eventAddress', 'reportNumber']));
		const cars = [];
		const firefighters = [];
		for (let i = 0; i < request.payload.cars.length; i++) {
			cars.push(
				_.assign(
					_.mapKeys(
						request.payload.cars[i], 
						(_, key) => key === 'car' ? 'CarId' : key
					), 
					{ ActionId: action.id }
				)
			);
		}
		for (let i = 0; i < request.payload.firefighters.length; i++) {
			firefighters.push(
				_.assign(
					_.mapKeys(
						_.omit(request.payload.firefighters[i], ['value']), 
						(_, key) => key === 'car' ? 'CarId' : key === 'id' ? 'FirefighterId' : key
					), 
					{ ActionId: action.id }
				)
			);
		}
		await ActionCars.bulkCreate(cars);
		await ActionFirefighters.bulkCreate(firefighters);
		return request.payload;
	}
}
	