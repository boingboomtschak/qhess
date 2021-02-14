const { Board } = require('../../lib/qhess.js');
const io = require('socket.io-client');

const SOCKET_URL = "ws://localhost";
const SOCKET_PORT = "8080";
const SOCKET_ADDR = `${SOCKET_URL}:${SOCKET_PORT}`;

class Client {
    constructor() {
        this.board = new Board();
        this.socket = io(SOCKET_ADDR);
        this.socket.on("connect" ,() => {
            console.log(`Connected to ${SOCKET_ADDR}!`);
        });
        this.socket.on("game_created", (data) => {
            
        });
        this.socket.on("game_joined", (data) => {

        });
        this.socket.on("board_update", (data) => {

        });
        this.socket.on("move_valid", (data) => {

        });
        this.socket.on("turn_ready", (data) => {

        });
        this.socket.on("game_left", (data) => {

        });
        this.socket.on("error", (data) => {

        });
    }
    getBoard() {
        return this.board;
    }
}

export default Client;