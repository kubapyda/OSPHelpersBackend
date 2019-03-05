import { AdminRole, AdminUserRole, headerValid } from '../../constants/constants';

import Joi from 'joi';
import PaymentsController from './payments.controller';

const paymentsController = new PaymentsController();
const schema = Joi.object().keys({
	paidYear: Joi.number().required(),
	FirefighterId: Joi.number().integer().required()
});

export default [
	{
		path: '/api/payments',
		method: 'GET',
		options: {
			handler: paymentsController.find,
			tags: ['api'],
			description: 'Find all Firefighters in system and they payments.',
			notes: 'Return all the firefighters and they payments from system.',
			plugins: AdminRole,
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/payments',
		method: 'POST',
		options: {
			handler: paymentsController.create,
			tags: ['api'],
			description: 'Add new payment for firefighter in system.',
			notes: 'Return newly added payment for Firefighters.',
			plugins: AdminRole,
			validate: {
				headers: headerValid,
				payload: schema
			}
		}
	},
	{
		path: '/api/payments/{id}',
		method: 'GET',
		options: {
			handler: paymentsController.findFirefighterPayments,
			tags: ['api'],
			description: 'Retun payments for firefighter with history in system.',
			notes: 'Return payments for Firefighter.',
			plugins: AdminUserRole,
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					id: Joi.number().integer().required()
				})
			}
		}
	}
];
