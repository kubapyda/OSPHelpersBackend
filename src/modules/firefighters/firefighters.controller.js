import Boom from 'boom';
import Firefighters from '../../models/firefighters.model';

export default class FirefightersController {

	async find (request, h) {
		return await Firefighters.findAll();
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

	async create (request, h) {
		return await Firefighters.create({
			name: request.payload.name,
			surname: request.payload.surname,
			gender: request.params.gender
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
