'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mycrudmodule Schema
 */
var MycrudmoduleSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Mycrudmodule name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Mycrudmodule', MycrudmoduleSchema);