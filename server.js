'use strict';

var socketio = require('socket.io');
var config = require('./config/config');
var mongoose = require('mongoose');

var dbOpts = {
    uri: 'mongodb://www:Password1@192.168.88.149/swm'
};
var serverPort = 8000;

var db = mongoose.connect(dbOpts.uri);

var app = require('./config/express')(db);

app.get('server').listen(serverPort);

exports = module.exports = app;