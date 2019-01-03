import * as _ from 'lodash';

import Boom from 'boom';
import Firefighters from '../../models/firefighters.model';
import Payments from '../../models/payments.model';
import sequelize from '../../models';

export default class PaymentsController {

	async find (request) {
		await sequelize.sync();
		const page = _.isUndefined(request.query.page) ? 1 : request.query.page;
		const size = 12;
		const offset = size * (page - 1);
		const payments = await Payments.findAll({
			attributes: ['id', 'paidYear'],
			include: [{
				model: Firefighters,
				attributes: ['id', 'name', 'surname']
			}]
		}).map(payment => {
			return {
				id: payment.id,
				fId: payment.Firefighter.id,
				name: `${payment.Firefighter.name} ${payment.Firefighter.surname}`,
				paidYear: payment.paidYear
			};
		});
		const firefighters = await Firefighters.findAll({
			attributes: ['id', 'name', 'surname'],
			limit: size,
			offset: offset
		});
		
		return {
			totalCount: await Firefighters.count(),
			data: firefighters.map(firefighter => {
				const firefighterPayments = _.filter(payments, { fId: firefighter.id });
				const lastPayment = Math.max(...firefighterPayments.map(payment => payment.paidYear));
				const payment = _.find(firefighterPayments, { paidYear: lastPayment });
				if (payment) {
					return payment;
				}
				return {
					fId: firefighter.id,
					name: `${firefighter.name} ${firefighter.surname}`
				};
			})
		};
	}

	async findFirefighterPayments (request) {
		await sequelize.sync();
		const firefighterPayments = await Payments.findAll({
			attributes: ['id', 'paidYear'],
			where: {
				FirefighterId: request.params.id
			}
		});
		if (!firefighterPayments) {
			return Boom.notFound();
		}
		return firefighterPayments;
	}

	async create (request) {
		return await Payments.create(request.payload);
	}

}
