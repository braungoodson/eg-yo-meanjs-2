'use strict';

//Mycrudmodules service used to communicate Mycrudmodules REST endpoints
angular.module('mycrudmodules').factory('Mycrudmodules', ['$resource',
	function($resource) {
		return $resource('mycrudmodules/:mycrudmoduleId', { mycrudmoduleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);