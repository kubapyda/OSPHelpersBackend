import Joi from 'joi';
import LoginController from './login.controller';

const loginController = new LoginController();

export default [
	{
		path: '/api/login',
		method: 'POST',
		options: {
			handler: loginController.login,
			tags: ['api'],
			description: 'User can login to his Account',
			notes: 'Return a JSON Web Token',
			auth: false,
			validate: {
				payload: Joi.object().keys({
					login: Joi.string().required(),
					password: Joi.string().required()
				})
			}
		}
	}
];
