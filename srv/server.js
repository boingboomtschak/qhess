// Constants
const SERVER_ADDR = "localhost";
const SERVER_PORT = 8080;
const SERVER_ORIGIN = `${SERVER_ADDR}:${SERVER_PORT}`;

// Requires
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
// DEBUG: CORS is allowed all origins right now, this is for development purposes
const opts = {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    }
};
const io = require("socket.io")(server, opts);
const { Game } = require("./qhess-server.js");

// Containers
const games = [];

// Starting server (express + socket.io server)
app.use(express.static(path.join(__dirname, "../cln/build")));
server.listen(SERVER_PORT);
console.log(`Server started on port ${SERVER_PORT}`);

// Listening for new socket connections
io.on("connection", socket => {

    // Connection status
    console.log(`Client ${socket.id} (${socket.handshake.address}) connected`);

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} (${socket.handshake.address}) disconnected`);
    });

    // Debugging
    socket.on("message", (data) => {
        console.log(`[${socket.id}]: ${data}`);
    });

    // Game events
    socket.on("create_game", (data) => {
        if(!games.some(g => g.ip == socket.handshake.address)) {
            let game = new Game(socket);
            games.push(game);
        } else {
            socket.emit("error", "Game still active for IP");
        }
    });

    socket.on("join_game", (data) => {
        if(games.some(g => g.id == data.gid)) {
            let game = games.find(g => g.id == data.gid);
            game.addPlayer(socket); 
        } else {
            socket.emit("error", "Game not found");
        }
    });

    socket.on("move_piece", (data) => {
        if(games.some(g => g.id == data.gid)) {
            let game = games.find(g => g.id == data.gid);
            game.movePiece(socket.id, data.id, data.to, data.energy);
        } else {
            socket.emit("error", "Game not found");
        }
    });
    // requires something like { gid: <UUID>, id: <UUID>, to: [2, 4], energy: 4 }

    socket.on("leave_game", (data) => {
        console.log(data);
    });

});
