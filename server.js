var path = require('path');
var express = require('express');
var socketio = require('socket.io');

var app = express();
var staticPath = path.join(__dirname, '/public');
var port = 8000;
var counter = 1;
app.use(express.static(staticPath));

const server = app.listen(port, function(err) {
    if(err) {
        console.log(err);
    }
    console.log(`Listening on port ${port}`);
});

var io = socketio.listen(server);

io.of('/counter').on('connection', function(socket) {
    console.log('Got connection from '+socket.client.conn.remoteAddress);
});
app.set('socketio', io);
app.set('server', server);

setInterval(function() {
    var data = {
        counter: counter 
    };
    console.log('EMITTING...');
    console.log(data);
    io.of('/counter').emit('api.v1.test', data);
    counter++;
},10000);