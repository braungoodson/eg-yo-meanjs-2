'use strict';

//Setting up route
angular.module('mycrudmodules').config(['$stateProvider',
	function($stateProvider) {
		// Mycrudmodules state routing
		$stateProvider.
		state('listMycrudmodules', {
			url: '/mycrudmodules',
			templateUrl: 'modules/mycrudmodules/views/list-mycrudmodules.client.view.html'
		}).
		state('createMycrudmodule', {
			url: '/mycrudmodules/create',
			templateUrl: 'modules/mycrudmodules/views/create-mycrudmodule.client.view.html'
		}).
		state('viewMycrudmodule', {
			url: '/mycrudmodules/:mycrudmoduleId',
			templateUrl: 'modules/mycrudmodules/views/view-mycrudmodule.client.view.html'
		}).
		state('editMycrudmodule', {
			url: '/mycrudmodules/:mycrudmoduleId/edit',
			templateUrl: 'modules/mycrudmodules/views/edit-mycrudmodule.client.view.html'
		});
	}
]);