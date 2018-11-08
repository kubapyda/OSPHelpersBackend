import Firefighters from '../models/firefighters.model';
import configPassword from '../../config-password';
import jsonwebtoken from 'jsonwebtoken';

export default class JwtService {

	static issue(options) {
		let { payload, expiresIn } = options;
		return jsonwebtoken.sign(payload, configPassword.SECRET_KEY, {
			expiresIn: expiresIn
		});
	}

	static async validate(decodedToken) {
		const user = await Firefighters.findOne({
			where: {
				id: decodedToken.id,
				login: decodedToken.login
			}
		});
		if (!user) {
			return {
				isValid: false
			};
		}

		return {
			isValid: true
		};
	}
    
}