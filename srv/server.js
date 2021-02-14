const path = require('path');
const express = require('express');
const io = require('socket.io') (8081);

var app = express();
app.use(express.static(path.join(__dirname, '../cln/build')));
var server = app.listen(8080);

const games = [];

io.on('connection', socket => {
    socket.send();

    socket.on('connect', (data) => {
        console.log(data);
    });

    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('create_game', (data) => {
        console.log(data);
    });

    socket.on('join_game', (data) => {
        console.log(data);
    });

    socket.on('move_piece', (data) => {
        console.log(data);
    });
});
