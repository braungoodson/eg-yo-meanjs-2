'use strict';

// Mycrudmodules controller
angular.module('mycrudmodules').controller('MycrudmodulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mycrudmodules',
	function($scope, $stateParams, $location, Authentication, Mycrudmodules) {
		$scope.authentication = Authentication;

		// Create new Mycrudmodule
		$scope.create = function() {
			// Create new Mycrudmodule object
			var mycrudmodule = new Mycrudmodules ({
				name: this.name
			});

			// Redirect after save
			mycrudmodule.$save(function(response) {
				$location.path('mycrudmodules/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mycrudmodule
		$scope.remove = function(mycrudmodule) {
			if ( mycrudmodule ) { 
				mycrudmodule.$remove();

				for (var i in $scope.mycrudmodules) {
					if ($scope.mycrudmodules [i] === mycrudmodule) {
						$scope.mycrudmodules.splice(i, 1);
					}
				}
			} else {
				$scope.mycrudmodule.$remove(function() {
					$location.path('mycrudmodules');
				});
			}
		};

		// Update existing Mycrudmodule
		$scope.update = function() {
			var mycrudmodule = $scope.mycrudmodule;

			mycrudmodule.$update(function() {
				$location.path('mycrudmodules/' + mycrudmodule._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mycrudmodules
		$scope.find = function() {
			$scope.mycrudmodules = Mycrudmodules.query();
		};

		// Find existing Mycrudmodule
		$scope.findOne = function() {
			$scope.mycrudmodule = Mycrudmodules.get({ 
				mycrudmoduleId: $stateParams.mycrudmoduleId
			});
		};
	}
]);