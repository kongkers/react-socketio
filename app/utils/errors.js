'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var _ = require('lodash');
var Q = require('q');
var Qx = require('qx');

exports.add = function(data) {
	var deferred = Q.defer();
	var error = new ErrorLog(data);

	error.save(function(err, response) {
		if(err) {
			console.log(err);
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(response);
		}
	});
	return deferred.promise;
};

exports.list = function(refType, refVal) {
	var deferred = Q.defer();

	ErrorLog.find({'refType': refType, 'refVal': refVal}).exec(function(err, errors) {
		if(err) {
			console.log(err);
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(errors);
		}
	});
	return deferred.promise;
};

exports.handleError = function(res, err, errorLocation) {
    console.log(errorLocation);
    console.log(err);
    return res.status(400).send({message: ''+err});
};

exports.returnError = function(res, message) {
    return res.status(400).send({message: message});
};

exports.notAuthorised = function(res, message) {
	return res.status(401).send({'message': message});
};
