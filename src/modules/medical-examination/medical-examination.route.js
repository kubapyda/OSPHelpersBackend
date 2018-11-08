import Joi from 'joi';
import MedicalExaminationController from './medical-examination.controller';
import { headerValid } from '../../constants/constants';

const medicalExaminationController = new MedicalExaminationController();
const schema = Joi.object().keys({
	medicalExaminationDate: Joi.date().required(),
	endMedicalExaminationDate: Joi.date().required(),
	FirefighterId: Joi.number().integer().required(),
});

export default [
	{
		path: '/api/medical-examination',
		method: 'GET',
		config: {
			handler: medicalExaminationController.find,
			tags: ['api'],
			description: 'Find all medical examination for firefighter in system.',
			notes: 'Return all medical examination for firefighter from system.',
			validate: {
				headers: headerValid
			}
		}
	},
	{
		path: '/api/medical-examination/{firefighterId}',
		method: 'GET',
		config: {
			handler: medicalExaminationController.findForOneFirefighter,
			tags: ['api'],
			description: 'Find medical examination history for firefighter in system by his id.',
			notes: 'Return a list of all medical examination for firefighter from system.',
			validate: {
				headers: headerValid,
				params: Joi.object().keys({
					firefighterId: Joi.number().required()
				})
			}
		}
	},
	{
		path: '/api/medical-examination',
		method: 'POST',
		config: {
			handler: medicalExaminationController.createMedicalExaminationForFirefigter,
			tags: ['api'],
			description: 'Create new medical examination for firefighter in system.',
			notes: 'Return newly created medical examination.',
			validate: {
				payload: schema,
				headers: headerValid
			}
		}
	}
];
