import * as _ from 'lodash';

import Boom from 'boom';
import Cars from '../../models/cars.model';
import sequelize from '../../models/index';

export default class CarsController {

	async find (request, h) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 5;
		const offset = size * (page - 1);
		return {
			totalCount: await Cars.count(),
			data: await Cars.findAll({
				limit: size,
				offset: offset
			})
		};
	}

	async findOne (request, h) {
		const car = await Cars.findOne({
			where: {
				id: request.params.id
			}
		});
		if (!car) {
			return Boom.notFound();
		}
		return car;
	}

	async findMinimal (request, h) {
		const carsMinimal = await Cars.findAll({ 
			attributes: ['id', 'mark', 'model', 'operationNumber']
		}).map(car => {
			return {
				id: car.id,
				value: `${car.mark} ${car.model} - ${car.operationNumber}`
			};
		});
		return carsMinimal;
	}

	async create (request, h) {
		await sequelize.sync();
		return await Cars.create({
			mark: request.payload.mark,
			model: request.payload.model,
			registrationNumber: request.payload.registrationNumber,
			productionDate: request.payload.productionDate,
			operationNumber: request.payload.operationNumber,
			taskCar: request.payload.taskCar,
			carWeight: request.payload.carWeight,
			technicalExaminationDate: request.payload.technicalExaminationDate,
			insuranceDate: request.payload.insuranceDate,
			specialCarsPurpose: request.payload.specialCarsPurpose,
			extinguishingEquipment: request.payload.extinguishingEquipment
		});
	}

	async update (request, h) {
		await Cars.update(request.payload, {
			where: {
				id: request.params.id
			}
		});
		return await Cars.findOne({
			where: {
				id: request.params.id
			}
		});
	}
	
	async delete (request, h) {
		const car = await Cars.destroy({
			where: {
				id: request.params.id
			}
		});
		if (!car) {
			return Boom.badRequest();
		}
		return {
			message: `Removed Car with id: ${request.params.id}`
		};
	}

}
	