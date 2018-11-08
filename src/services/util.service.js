import Bcrypt from 'bcrypt';
import configPassword from '../../config-password';

export default class UtilService {
	static async hashPassword(password) {
		try {
			return await Bcrypt.hash(password, configPassword.SALT_ROUND);
		} catch (err) {
			throw err;
		}
	}

	static async comparePassword(password, hash) {
		try {
			return await Bcrypt.compare(password, hash);
		} catch (err) {
			throw err;
		}
	}
}