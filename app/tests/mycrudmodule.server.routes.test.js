'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mycrudmodule = mongoose.model('Mycrudmodule'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mycrudmodule;

/**
 * Mycrudmodule routes tests
 */
describe('Mycrudmodule CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Mycrudmodule
		user.save(function() {
			mycrudmodule = {
				name: 'Mycrudmodule Name'
			};

			done();
		});
	});

	it('should be able to save Mycrudmodule instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mycrudmodule
				agent.post('/mycrudmodules')
					.send(mycrudmodule)
					.expect(200)
					.end(function(mycrudmoduleSaveErr, mycrudmoduleSaveRes) {
						// Handle Mycrudmodule save error
						if (mycrudmoduleSaveErr) done(mycrudmoduleSaveErr);

						// Get a list of Mycrudmodules
						agent.get('/mycrudmodules')
							.end(function(mycrudmodulesGetErr, mycrudmodulesGetRes) {
								// Handle Mycrudmodule save error
								if (mycrudmodulesGetErr) done(mycrudmodulesGetErr);

								// Get Mycrudmodules list
								var mycrudmodules = mycrudmodulesGetRes.body;

								// Set assertions
								(mycrudmodules[0].user._id).should.equal(userId);
								(mycrudmodules[0].name).should.match('Mycrudmodule Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mycrudmodule instance if not logged in', function(done) {
		agent.post('/mycrudmodules')
			.send(mycrudmodule)
			.expect(401)
			.end(function(mycrudmoduleSaveErr, mycrudmoduleSaveRes) {
				// Call the assertion callback
				done(mycrudmoduleSaveErr);
			});
	});

	it('should not be able to save Mycrudmodule instance if no name is provided', function(done) {
		// Invalidate name field
		mycrudmodule.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mycrudmodule
				agent.post('/mycrudmodules')
					.send(mycrudmodule)
					.expect(400)
					.end(function(mycrudmoduleSaveErr, mycrudmoduleSaveRes) {
						// Set message assertion
						(mycrudmoduleSaveRes.body.message).should.match('Please fill Mycrudmodule name');
						
						// Handle Mycrudmodule save error
						done(mycrudmoduleSaveErr);
					});
			});
	});

	it('should be able to update Mycrudmodule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mycrudmodule
				agent.post('/mycrudmodules')
					.send(mycrudmodule)
					.expect(200)
					.end(function(mycrudmoduleSaveErr, mycrudmoduleSaveRes) {
						// Handle Mycrudmodule save error
						if (mycrudmoduleSaveErr) done(mycrudmoduleSaveErr);

						// Update Mycrudmodule name
						mycrudmodule.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mycrudmodule
						agent.put('/mycrudmodules/' + mycrudmoduleSaveRes.body._id)
							.send(mycrudmodule)
							.expect(200)
							.end(function(mycrudmoduleUpdateErr, mycrudmoduleUpdateRes) {
								// Handle Mycrudmodule update error
								if (mycrudmoduleUpdateErr) done(mycrudmoduleUpdateErr);

								// Set assertions
								(mycrudmoduleUpdateRes.body._id).should.equal(mycrudmoduleSaveRes.body._id);
								(mycrudmoduleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mycrudmodules if not signed in', function(done) {
		// Create new Mycrudmodule model instance
		var mycrudmoduleObj = new Mycrudmodule(mycrudmodule);

		// Save the Mycrudmodule
		mycrudmoduleObj.save(function() {
			// Request Mycrudmodules
			request(app).get('/mycrudmodules')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mycrudmodule if not signed in', function(done) {
		// Create new Mycrudmodule model instance
		var mycrudmoduleObj = new Mycrudmodule(mycrudmodule);

		// Save the Mycrudmodule
		mycrudmoduleObj.save(function() {
			request(app).get('/mycrudmodules/' + mycrudmoduleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mycrudmodule.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mycrudmodule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mycrudmodule
				agent.post('/mycrudmodules')
					.send(mycrudmodule)
					.expect(200)
					.end(function(mycrudmoduleSaveErr, mycrudmoduleSaveRes) {
						// Handle Mycrudmodule save error
						if (mycrudmoduleSaveErr) done(mycrudmoduleSaveErr);

						// Delete existing Mycrudmodule
						agent.delete('/mycrudmodules/' + mycrudmoduleSaveRes.body._id)
							.send(mycrudmodule)
							.expect(200)
							.end(function(mycrudmoduleDeleteErr, mycrudmoduleDeleteRes) {
								// Handle Mycrudmodule error error
								if (mycrudmoduleDeleteErr) done(mycrudmoduleDeleteErr);

								// Set assertions
								(mycrudmoduleDeleteRes.body._id).should.equal(mycrudmoduleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mycrudmodule instance if not signed in', function(done) {
		// Set Mycrudmodule user 
		mycrudmodule.user = user;

		// Create new Mycrudmodule model instance
		var mycrudmoduleObj = new Mycrudmodule(mycrudmodule);

		// Save the Mycrudmodule
		mycrudmoduleObj.save(function() {
			// Try deleting Mycrudmodule
			request(app).delete('/mycrudmodules/' + mycrudmoduleObj._id)
			.expect(401)
			.end(function(mycrudmoduleDeleteErr, mycrudmoduleDeleteRes) {
				// Set message assertion
				(mycrudmoduleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mycrudmodule error error
				done(mycrudmoduleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mycrudmodule.remove().exec();
		done();
	});
});