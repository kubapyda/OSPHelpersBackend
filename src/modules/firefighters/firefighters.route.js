import FirefightersController from './firefighters.controller';

const firefightersController = new FirefightersController();

export default [
	{
		path: '/api/firefighters',
		method: 'GET',
		config: {
			handler: firefightersController.find,
			tags: ['api'],
			description: 'Find all Firefighters in system.',
			notes: 'Return all the firefighters from system.'
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'GET',
		config: {
			handler: firefightersController.findOne,
			tags: ['api'],
			description: 'Find Firefighters in system by id.',
			notes: 'Return a single firefighters from system.'
		}
	},
	{
		path: '/api/firefighters',
		method: 'POST',
		config: {
			handler: firefightersController.create,
			tags: ['api'],
			description: 'Create new firefighter in system.',
			notes: 'Return newly created firefighter.'
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'PUT',
		config: {
			handler: firefightersController.update,
			tags: ['api'],
			description: 'Update information about firefighter in system.',
			notes: 'Return updated firefighter.'
		}
	},
	{
		path: '/api/firefighters/{id}',
		method: 'DELETE',
		config: {
			handler: firefightersController.delete,
			tags: ['api'],
			description: 'Delete firefighters by id from system.',
			notes: 'Return a deleted message.'
		}
	},
];
