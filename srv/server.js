// Constants
const SERVER_PORT = 8080;

// Requires
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { Game } = require('./qhess-server.js');

// Containers
const games = [];

// Starting server (express + socket.io server)
app.use(express.static(path.join(__dirname, '../cln/build')));
server.listen(SERVER_PORT);
console.log(`Server started on port ${SERVER_PORT}`);

// Listening for new socket connections
io.on('connection', socket => {
    console.log(`Client ${socket.id} (${socket.handshake.address}) connected`);

    // Debugging
    socket.on('message', (data) => {
        console.log(`[${socket.id}]: ${data}`);
    });

    // Game events
    socket.on('create_game', (data) => {
        if(!games.some(g => g.ip == socket.handshake.address)) {
            games.push(new Game(socket));
        } else {
            socket.emit("error", "Game still active for IP");
        }
    });

    socket.on('join_game', (data) => {
        if(games.some(g => g.id == data.gid)) {
            let game = games.find(g => g.id == data.gid);
            game.addPlayer(socket); 
        } else {
            socket.emit("error", "Game not found");
        }
    });

    socket.on('move_piece', (data) => {
        
    });
    // requires something like { gid: <UUID>, id: <UUID>, to: [2, 4], energy: 4 }

    socket.on('leave_game', (data) => {
        console.log(data);
    });
});
