'use strict';

// Configuring the Articles module
angular.module('mycrudmodules').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Mycrudmodules', 'mycrudmodules', 'dropdown', '/mycrudmodules(/create)?');
		Menus.addSubMenuItem('topbar', 'mycrudmodules', 'List Mycrudmodules', 'mycrudmodules');
		Menus.addSubMenuItem('topbar', 'mycrudmodules', 'New Mycrudmodule', 'mycrudmodules/create');
	}
]);