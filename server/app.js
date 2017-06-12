var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nsp = io.of('/my-namespace');
var port = process.env.PORT || 5000;
var path = require('path');

var content;

io.on('connection', function(socket) {

    // 老师录制代码
    socket.on('teacher.programming', function(msg) {
        console.log('input ---- ' + msg);
        io.emit('teacher.programming', msg);
    });

    // 获取编程页面的内容
    socket.on('programming.content', function(msg) {
        console.log('programming.content ---- ' + msg);
        content = msg;
    });

});


http.listen(port, function() {
    console.log('listening on --------:' + port);
});
