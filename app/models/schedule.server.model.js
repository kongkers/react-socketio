'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
    },
    startDate: {
        type: Date
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    }
});

mongoose.model('Schedule', ScheduleSchema, 'Schedules');