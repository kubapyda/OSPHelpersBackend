import Joi from 'joi';

const headerValid = Joi.object({
	authorization: Joi.string().required()
}).unknown();

const AdminRole = {
	role: 'ADMIN'
};

export { headerValid, AdminRole };