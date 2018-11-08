import CarsModule from '../modules/cars/cars.module';
import EquipmentModule from '../modules/equipment/equipment.module';
import FirefightersModule from '../modules/firefighters/firefighteres.module';
import Good from 'good';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import LoginModule from '../modules/login/login.module';
import MedicalExaminationModule from '../modules/medical-examination/medical-examination.module';
import Vision from 'vision';
import hapiAuthJwt2 from 'hapi-auth-jwt2';

const SwaggerOptions = {
	info: {
		title: 'OSP Helpers API Documentation',
		version: '0.0.1'
	}
};

const goodOptions = {
	ops: {
		interval: 1000
	},
	reporters: {
		myConsoleReporter: [{
			module: 'good-squeeze',
			name: 'Squeeze',
			args: [{ log: '*', response: '*' }]
		}, {
			module: 'good-console'
		}, 'stdout']
	}
};

export default [
	Inert,
	Vision,
	{
		plugin: HapiSwagger,
		options: SwaggerOptions
	},
	{
		plugin: Good,
		options: goodOptions
	},
	hapiAuthJwt2,
	LoginModule,
	FirefightersModule,
	CarsModule,
	EquipmentModule,
	MedicalExaminationModule
];
