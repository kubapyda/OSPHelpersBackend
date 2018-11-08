import Joi from 'joi';

const headerValid = Joi.object({
	authorization: Joi.string().required()
}).unknown();

export { headerValid };