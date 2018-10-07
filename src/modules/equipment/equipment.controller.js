import * as _ from 'lodash';

import Boom from 'boom';
import EquipmentItem from '../../models/equipment.model';
import sequelize from '../../models/index';

export default class EquipmentController {

	async find (request, h) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 5;
		const offset = size * (page - 1);
		return {
			totalCount: await EquipmentItem.count(),
			data: await EquipmentItem.findAll({
				limit: size,
				offset: offset
			})
		};
	}

	async findOne (request, h) {
		const equipmentItem = await EquipmentItem.findOne({
			where: {
				id: request.params.id
			}
		});
		if (!equipmentItem) {
			return Boom.notFound();
		}
		return equipmentItem;
	}

	async findMinimal (request, h) {
		const equipmentMinimal = await EquipmentItem.findAll({
			attributes: ['id', 'name']
		}).map(equipmentItem => {
			return {
				id: equipmentItem.id,
				value: equipmentItem.name
			};
		});
		return equipmentMinimal;
	}

	async create (request, h) {
		await sequelize.sync();
		return await EquipmentItem.create({
			name: request.payload.name,
			approvalDate: request.payload.approvalDate
		});
	}

	async update (request, h) {
		await EquipmentItem.update(request.payload, {
			where: {
				id: request.params.id
			}
		});
		return await EquipmentItem.findOne({
			where: {
				id: request.params.id
			}
		});
	}
	
	async delete (request, h) {
		const equipmentItem = await EquipmentItem.destroy({
			where: {
				id: request.params.id
			}
		});
		if (!equipmentItem) {
			return Boom.badRequest();
		}
		return {
			message: `Removed equipment item with id: ${request.params.id}`
		};
	}

}
	