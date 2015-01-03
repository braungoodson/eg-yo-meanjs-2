'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mycrudmodule = mongoose.model('Mycrudmodule');

/**
 * Globals
 */
var user, mycrudmodule;

/**
 * Unit tests
 */
describe('Mycrudmodule Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			mycrudmodule = new Mycrudmodule({
				name: 'Mycrudmodule Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return mycrudmodule.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			mycrudmodule.name = '';

			return mycrudmodule.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Mycrudmodule.remove().exec();
		User.remove().exec();

		done();
	});
});