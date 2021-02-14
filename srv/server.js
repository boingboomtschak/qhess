// Constants
const BROWSER_PORT = 8080;
const SOCKET_PORT = 8081;

// Requires
const path = require('path');
const express = require('express');
const io = require('socket.io') (SOCKET_PORT);
const { Game, Player } = require('./qhess-server.js');

// Containers
const games = [];

// Setting up express to serve from /cln/build
var app = express();
app.use(express.static(path.join(__dirname, '../cln/build')));

// Serving files in /lib to the /lib endpoint
app.use("/lib", express.static(path.join(__dirname, '../lib')));

// Starting up server
var server = app.listen(BROWSER_PORT);
console.log(`Server started on port ${BROWSER_PORT}`);

// Listening for new socket connections
console.log(`Listening for new socket connections on ${SOCKET_PORT}`);
io.on('connection', socket => {
    socket.send();

    socket.on('connect', (data) => {
        console.log(data);
    });

    socket.on('message', (data) => {
        console.log(data);
    });

    // Game events
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
