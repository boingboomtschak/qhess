const { Board } = require("../../lib/qhess.js");
const io = require("socket.io-client");

const SOCKET_URL = "ws://localhost";
const SOCKET_PORT = "8080";
const SOCKET_ADDR = `${SOCKET_URL}:${SOCKET_PORT}`;

class Client {

    constructor(stateHandler) {
        this.setState = stateHandler;
        this.socket = io(SOCKET_ADDR);
        this.board = null;
        this.gid = undefined;
        this.selectedSpace = { x: null, y: null };
        this.validMoves = [];
        this.selectedPiece = null;

        this.handleConnection();
        this.handleGame();
        this.handleMoves();
        this.handleErrors();
    }

    handleConnection() {
        this.socket.on("connect", () => {
            console.log(`Connected to ${SOCKET_ADDR} from ${this.socket.id}!`);
        });
    }

    handleGame() {
        this.socket.on("game_created", (data) => {
            console.log(`Created game successfully with gid ${data.gid}`)
            this.gid = data.gid;
        });
        this.socket.on("game_joined", (data) => {
            console.log(`Joined game successfully with gid ${data.gid}`);
            this.gid = data.gid;
        });
        this.socket.on("game_left", (data) => {
            console.log(`Left game ${this.gid}`);
            this.gid = undefined;
        });
    }

    handleMoves() {
        this.socket.on("board_update", (data) => {
            console.log(`Updating board from server`);
            this.board = data.board;
            this.deserializeBoard();
            this.setState({ update: true });
        });
        this.socket.on("move_valid", (data) => {
            console.log(`Move accepted by the server`);
        });
        this.socket.on("turn_ready", (data) => {
            console.log(`Turn notification received from server`);
            // something here to trigger UI to notify the player
        });
    }

    handleErrors() {
        this.socket.on("error", (data) => {
            console.log(`ERROR: ${data}`);
            // something here that shows the error in UI (bootstrap alert box?)
        });
    }

    initBoard() {
        this.board = new Board();
        this.setState({ board: this.board });
    }

    getBoard() {
        return this.board;
    }

    noneSelected() {
        return this.selectedSpace.x == null && this.selectedSpace.y == null;
    }

    isSelectedSpace(space) {
        let { x, y } = space.pos;
        return this.selectedSpace.x == x && this.selectedSpace.y == y;
    }

    unhighlightValidMoves() {
        this.validMoves = [];
        this.board.board.forEach(row => {
            row.forEach(col => {
                col.prob = 0;
            });
        });
        this.setState({ update: true });
    }

    highlightValidMoves(space) {
        this.unhighlightValidMoves();
        this.validMoves = space.getValidMoves(this.board).flat();
        this.validMoves.forEach(([x, y]) => {
            this.board.board[x][y].prob = 1;
        });
        this.setState({ update: true });
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

    deserializeBoard() {
        this.board.board.forEach(row => {
            row.forEach(col => {
                col.pieces.forEach(piece => {
                    piece.board = this.board;
                });
            });
        });
    }

}

export default Client;