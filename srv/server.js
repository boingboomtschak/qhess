// Constants
const BROWSER_PORT = 8080;
const SOCKET_PORT = 8080;

// Requires
const path = require('path');
const express = require('express');
const io = require('socket.io') (SOCKET_PORT);
/* BELOW WILL BE REQUIRED WHEN WE ARE NO LONGER USING LOCALHOST BECAUSE OF CORS (https://socket.io/docs/v3/handling-cors/)
const io = require('socket.io') (httpServer, {
    cors: {
        origin: 'http://localhost',
        methods: ["GET", "POST"]
    }
})
*/
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
    socket.on('connect', (data) => {
        if(data) {
            console.log(`Client ${socket.id} (${socket.address}) connected with data: ${data}`);
        } else {
            console.log(`Client ${socket.id} (${socket.address}) connected`);
        }
    });

    // Debugging
    socket.on('message', (data) => {
        console.log(data);
    });

    // Game events
    socket.on('create_game', (data) => {
        if(!games.some(g => g.ip == socket.address)) {
            games.push(new Game(socket));
        } else {
            socket.emit("error", "Game still active for IP");
        }
    });

    socket.on('join_game', (gid) => {
        if(games.some(g => g.id == gid)) {
            let game = games.find(g => g.id == gid);
            game.addPlayer(socket); 
        } else {
            socket.emit("error", "Game not found");
        }
    });

    socket.on('move_piece', (data) => {
        
    });
    // requires something like { id: <UUID>, to: [2, 4], energy: 4 }

    socket.on('leave_game', (data) => {
        console.log(data);
    });
});
