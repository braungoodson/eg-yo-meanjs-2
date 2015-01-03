'use strict';

(function() {
	// Mycrudmodules Controller Spec
	describe('Mycrudmodules Controller Tests', function() {
		// Initialize global variables
		var MycrudmodulesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Mycrudmodules controller.
			MycrudmodulesController = $controller('MycrudmodulesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mycrudmodule object fetched from XHR', inject(function(Mycrudmodules) {
			// Create sample Mycrudmodule using the Mycrudmodules service
			var sampleMycrudmodule = new Mycrudmodules({
				name: 'New Mycrudmodule'
			});

			// Create a sample Mycrudmodules array that includes the new Mycrudmodule
			var sampleMycrudmodules = [sampleMycrudmodule];

			// Set GET response
			$httpBackend.expectGET('mycrudmodules').respond(sampleMycrudmodules);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mycrudmodules).toEqualData(sampleMycrudmodules);
		}));

		it('$scope.findOne() should create an array with one Mycrudmodule object fetched from XHR using a mycrudmoduleId URL parameter', inject(function(Mycrudmodules) {
			// Define a sample Mycrudmodule object
			var sampleMycrudmodule = new Mycrudmodules({
				name: 'New Mycrudmodule'
			});

			// Set the URL parameter
			$stateParams.mycrudmoduleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mycrudmodules\/([0-9a-fA-F]{24})$/).respond(sampleMycrudmodule);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mycrudmodule).toEqualData(sampleMycrudmodule);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mycrudmodules) {
			// Create a sample Mycrudmodule object
			var sampleMycrudmodulePostData = new Mycrudmodules({
				name: 'New Mycrudmodule'
			});

			// Create a sample Mycrudmodule response
			var sampleMycrudmoduleResponse = new Mycrudmodules({
				_id: '525cf20451979dea2c000001',
				name: 'New Mycrudmodule'
			});

			// Fixture mock form input values
			scope.name = 'New Mycrudmodule';

			// Set POST response
			$httpBackend.expectPOST('mycrudmodules', sampleMycrudmodulePostData).respond(sampleMycrudmoduleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mycrudmodule was created
			expect($location.path()).toBe('/mycrudmodules/' + sampleMycrudmoduleResponse._id);
		}));

		it('$scope.update() should update a valid Mycrudmodule', inject(function(Mycrudmodules) {
			// Define a sample Mycrudmodule put data
			var sampleMycrudmodulePutData = new Mycrudmodules({
				_id: '525cf20451979dea2c000001',
				name: 'New Mycrudmodule'
			});

			// Mock Mycrudmodule in scope
			scope.mycrudmodule = sampleMycrudmodulePutData;

			// Set PUT response
			$httpBackend.expectPUT(/mycrudmodules\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mycrudmodules/' + sampleMycrudmodulePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mycrudmoduleId and remove the Mycrudmodule from the scope', inject(function(Mycrudmodules) {
			// Create new Mycrudmodule object
			var sampleMycrudmodule = new Mycrudmodules({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mycrudmodules array and include the Mycrudmodule
			scope.mycrudmodules = [sampleMycrudmodule];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mycrudmodules\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMycrudmodule);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mycrudmodules.length).toBe(0);
		}));
	});
}());