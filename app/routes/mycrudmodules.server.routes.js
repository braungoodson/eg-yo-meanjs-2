'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mycrudmodules = require('../../app/controllers/mycrudmodules.server.controller');

	// Mycrudmodules Routes
	app.route('/mycrudmodules')
		.get(mycrudmodules.list)
		.post(users.requiresLogin, mycrudmodules.create);

	app.route('/mycrudmodules/:mycrudmoduleId')
		.get(mycrudmodules.read)
		.put(users.requiresLogin, mycrudmodules.hasAuthorization, mycrudmodules.update)
		.delete(users.requiresLogin, mycrudmodules.hasAuthorization, mycrudmodules.delete);

	// Finish by binding the Mycrudmodule middleware
	app.param('mycrudmoduleId', mycrudmodules.mycrudmoduleByID);
};
