'use strict';
var path = require('path');
var mongoose = require('mongoose');
var moment = require('moment');
var Schedule = mongoose.model('Schedule');
var ObjectId = mongoose.Types.ObjectId;
var Checks = require('../utils/checks');
var Errors = require('../utils/errors');

var _ = require('lodash');
var Q = require('q');
var Qx = require('qx');

exports.index = function(req, res) {
    var indexUri = '/var/www/public/index.html';
    res.sendFile(indexUri);
};

exports.list = function(req, res) {
    Schedule.find().sort('startTime').exec(function(err, schedules) {
        if(err) {
            Errors.handleError(res, err, 'There was an error getting all scheduled shows.');
        }
        else {
            var schedulesArr = [];
            var len = schedules.length;
            for(var i=0; i<len; i++) {
                var scheduleObj = schedules[i].toObject();
                var startTime = moment(schedules[i].startTime);
                var endTime = moment(schedules[i].endTime);
                var duration = endTime.diff(startTime, 'minutes');
                scheduleObj.startTime = startTime.format('hh:mmA');
                scheduleObj.endTime = endTime.format('hh:mmA');
                scheduleObj.duration = duration;
                schedulesArr.push(scheduleObj);
            }

            res.jsonp({
                schedules: schedulesArr
            });
        }
    });
};

var checkIfIdExists = function(id) {
    var deferred = Q.defer();

    Schedule.find({'id': id}).exec(function(err, schedules) {
        if(err) deferred.reject(err);
        else {
            deferred.resolve(schedules.length);
        }
    });
    return deferred.promise;
};

exports.create = function(req, res) {
    if(Checks.isUndefinedOrNull(req.body.startTime)) {
        return Errors.returnError(res, 'Start time is required. This can be either a unix timestamp, or a date string.');
    }
    if(Checks.isUndefinedOrNull(req.body.endTime)) {
        return Errors.returnError(res, 'End time is required. This can be either a unix timestamp, or a date string.');
    }

    if(Checks.isUndefinedOrNull(req.body.title)) {
        return Errors.returnError(res, 'Title is required.');
    }
    if(Checks.isUndefinedOrNull(req.body.description)) {
        return Errors.returnError(res, 'Description is required.');
    }
    if(Checks.isUndefinedOrNull(req.body.genre)) {
        return Errors.returnError(res, 'Genre is required.');
    }
    if(isNaN(req.body.startTime)) {
        req.body.startTime = moment(req.body.startTime).toDate();
    }
    else {
        req.body.startTime = moment.unix(parseInt(req.body.startTime));
    }
    if(isNaN(req.body.endTime)) {
        req.body.endTime = moment(req.body.endTime).toDate();
    }
    else {
        req.body.endTime = moment.unix(parseInt(req.body.endTime));
    }

    var schedule = new Schedule(req.body);

    checkIfIdExists(schedule.id).then(function(idExists) {
        if(!idExists) {
            schedule.save(function(err, response) {
                if(err) {
                    Errors.handleError(res, err, 'There was an error saving the new schedule.');
                }
                else {
                    var socketio = req.app.get('socketio');
                    var scheduleObj = response.toObject();
                    var startTime = moment(response.startTime);
                    var endTime = moment(response.endTime);
                    var duration = endTime.diff(startTime, 'minutes');
                    scheduleObj.startTime = startTime.format('hh:mmA');
                    scheduleObj.endTime = endTime.format('hh:mmA');
                    scheduleObj.duration = duration;

                    var notification = {
                        schedule: scheduleObj
                    }
                    socketio.emit('api.v1.schedule.created', notification);
                    res.jsonp({
                        schedule: schedule
                    });
                }
            });
        }
        else {
            Errors.returnError(res, 'Schedule Id already exists. The schedule was not saved.');
        }
    });
};

exports.delete = function(req, res) {
    var scheduleId = new ObjectId(req.params.scheduleId);

    Schedule.remove({'_id': scheduleId}).exec(function(err, response) {
        if(err) {
            Errors.handleError(res, err, 'There was an error deleting the schedule.');
        }
        else {
            var socketio = req.app.get('socketio');
            var notification = {
                scheduleId: scheduleId
            };
            socketio.emit('api.v1.schedule.deleted', notification);
            res.jsonp({
                scheduleId: scheduleId
            });
        }
    });
}