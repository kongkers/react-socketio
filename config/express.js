'use strict';

var express = require('express');
var http = require('http');
var session = require('express-session');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var compress = require('compression');
var mongoStore = require('connect-mongo')({
    session: session
});
var cors = require('cors');
var path = require('path');
var config = require('./config');
var _ = require('lodash');

module.exports = function(db) {
    var app = express();

    var models = require('../app/models/schedule.server.model');
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

    //Enable cookie parser middleware
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json({limit: '15mb'}));
    app.use(bodyParser());
    app.use(cookieParser());
    app.enable('jsonp callback');
    
    //Load the routes
    var routes = require('../app/routes/all')(app);
    app.use(express.static(path.resolve('./public')));

    var server = http.createServer(app);
    var io = socketio.listen(server);
    
    io.on('connection', function(socket) {
        console.log('Got connection from '+socket.client.conn.remoteAddress);
    });
    app.set('socketio', io);
    app.set('server', server);

    return app;
}