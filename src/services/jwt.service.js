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

	static async validate(decodedToken, request) {
		const role = request.route.settings.plugins.role;
		const user = await Firefighters.findOne({
			attributes: ['id', 'login', 'role'],
			where: {
				id: decodedToken.id,
				login: decodedToken.login
			}
		});
		
		if (!user || user.role !== role) {
			return {
				isValid: false
			};
		}

		return {
			isValid: true
		};
	}
    
}