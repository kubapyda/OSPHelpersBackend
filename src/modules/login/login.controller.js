import Boom from 'boom';
import Firefighters from '../../models/firefighters.model';
import JwtService from '../../services/jwt.service';
import UtilService from '../../services/util.service';

export default class LoginController {

	async login (request, h) {
		const user = await Firefighters.findOne({
			attributes: ['id', 'login', 'password', 'role', 'firstLogin'],
			where: {
				login: request.payload.login
			}
		});
		if (!user) {
			return Boom.unauthorized('Invalid credentials');
		}
		const matched = await UtilService.comparePassword(request.payload.password, user.password);
		if (matched) {
			return {
				token: await JwtService.issue({
					payload: {
						id: user.id,
						login: user.login
					},
					expiresIn: '1 day'
				})
			};
		}
		return Boom.unauthorized('Invalid credentials');
	}

}
