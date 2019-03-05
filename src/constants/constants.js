import Joi from 'joi';

const headerValid = Joi.object({
	authorization: Joi.string().required()
}).unknown();

const AdminRole = {
	role: 'ADMIN'
};

const UserRole = {
	role: 'USER'
};

const AdminUserRole = {
	role: ['USER', 'ADMIN']
};

export { headerValid, AdminRole, UserRole, AdminUserRole };