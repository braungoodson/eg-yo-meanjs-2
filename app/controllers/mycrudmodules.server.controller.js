'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mycrudmodule = mongoose.model('Mycrudmodule'),
	_ = require('lodash');

/**
 * Create a Mycrudmodule
 */
exports.create = function(req, res) {
	var mycrudmodule = new Mycrudmodule(req.body);
	mycrudmodule.user = req.user;

	mycrudmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mycrudmodule);
		}
	});
};

/**
 * Show the current Mycrudmodule
 */
exports.read = function(req, res) {
	res.jsonp(req.mycrudmodule);
};

/**
 * Update a Mycrudmodule
 */
exports.update = function(req, res) {
	var mycrudmodule = req.mycrudmodule ;

	mycrudmodule = _.extend(mycrudmodule , req.body);

	mycrudmodule.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mycrudmodule);
		}
	});
};

/**
 * Delete an Mycrudmodule
 */
exports.delete = function(req, res) {
	var mycrudmodule = req.mycrudmodule ;

	mycrudmodule.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mycrudmodule);
		}
	});
};

/**
 * List of Mycrudmodules
 */
exports.list = function(req, res) { 
	Mycrudmodule.find().sort('-created').populate('user', 'displayName').exec(function(err, mycrudmodules) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mycrudmodules);
		}
	});
};

/**
 * Mycrudmodule middleware
 */
exports.mycrudmoduleByID = function(req, res, next, id) { 
	Mycrudmodule.findById(id).populate('user', 'displayName').exec(function(err, mycrudmodule) {
		if (err) return next(err);
		if (! mycrudmodule) return next(new Error('Failed to load Mycrudmodule ' + id));
		req.mycrudmodule = mycrudmodule ;
		next();
	});
};

/**
 * Mycrudmodule authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mycrudmodule.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
