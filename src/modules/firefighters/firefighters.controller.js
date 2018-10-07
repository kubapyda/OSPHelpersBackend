import * as _ from 'lodash';

import Boom from 'boom';
import Firefighters from '../../models/firefighters.model';
import sequelize from '../../models/index';

export default class FirefightersController {

	async find (request, h) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 5;
		const offset = size * (page - 1);
		return {
			totalCount: await Firefighters.count(),
			data: await Firefighters.findAll({
				limit: size,
				offset: offset
			})
		};
	}

	async findOne (request, h) {
		const firefighter = await Firefighters.findOne({
			where: {
				id: request.params.id
			}
		});
		if (!firefighter) {
			return Boom.notFound();
		}
		return firefighter;
	}

	async findMinimal (request, h) {
		const firefightersMinimal = await Firefighters.findAll({ 
			where: { type: request.params.type },
			attributes: ['id', 'name', 'surname']
		}).map(firefighter => {
			return {
				id: firefighter.id,
				value: `${firefighter.name} ${firefighter.surname}`
			};
		});
		return firefightersMinimal;
	}

	async create (request, h) {
		let password = 'qwerty';
		await sequelize.sync();
		return await Firefighters.create({
			name: request.payload.name,
			surname: request.payload.surname,
			login: request.payload.login,
			gender: request.payload.gender,
			birthdayDate: request.payload.birthdayDate,
			entryDate: request.payload.entryDate,
			type: request.payload.type,
			password: password
		});
	}

	async update (request, h) {
		await Firefighters.update(request.payload, {
			where: {
				id: request.params.id
			}
		});
		return await Firefighters.findOne({
			where: {
				id: request.params.id
			}
		});
	}
	
	async delete (request, h) {
		const firefighter = await Firefighters.destroy({
			where: {
				id: request.params.id
			}
		});
		if (!firefighter) {
			return Boom.badRequest();
		}
		return {
			message: `Removed Firefighter with id: ${request.params.id}`
		};
	}

}
	