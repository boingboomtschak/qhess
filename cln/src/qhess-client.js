const { Board } = require("../../lib/qhess.js");
const io = require("socket.io-client");

const SOCKET_URL = "ws://localhost";
const SOCKET_PORT = "8080";
const SOCKET_ADDR = `${SOCKET_URL}:${SOCKET_PORT}`;

class Client {
    constructor() {
        this.board = new Board();
        this.socket = io(SOCKET_ADDR);
        this.socket.on("connect" ,() => {
            console.log(`Connected to ${SOCKET_ADDR} from ${this.socket.id}!`);
        });
        this.socket.on("game_created", (data) => {
            console.log(`Created game successfully with gid ${data.gid}`)
            this.gid = data.gid;
        });
        this.socket.on("game_joined", (data) => {
            console.log(`Joined game successfully with gid ${data.gid}`);
            this.gid = data.gid;
        });
        this.socket.on("board_update", (data) => {
            console.log(`Updating board from server`);
            this.board = data.board;
            // something here to force a re-render of the board state
        });
        this.socket.on("move_valid", (data) => {
            console.log(`Move accepted by the server`);
        });
        this.socket.on("turn_ready", (data) => {
            console.log(`Turn notification received from server`);
            // something here to trigger UI to notify the player
        });
        this.socket.on("game_left", (data) => {
            console.log(`Left game ${this.gid}`);
            this.gid = undefined;
        });
        this.socket.on("error", (data) => {
            console.log(`ERROR: ${data}`);
            // something here that shows the error in UI (bootstrap alert box?)
        });
    }
    getBoard() {
        return this.board;
    }
    createGame() {
        this.socket.emit("create_game");
    }
    joinGame(id) {
        this.socket.emit("join_game", { gid: id });
    }
    movePiece(id, x, y, e) {
        if(this.gid != undefined) {
            this.socket.emit("move_piece", {
                gid: this.gid,
                id: id,
                to: [x, y],
                e: e
            });
        }
    }
}

export default Client;