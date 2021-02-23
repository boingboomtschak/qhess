const { v4 : uuid } = require("uuid");
const { Board } = require("../lib/qhess.js");
const io = require("socket.io");

class Game {
    constructor(player) {
        this.id = uuid();
        this.ip = player.handshake.address;
        this.turn = player;
        this.players = [player];
        this.board = new Board();
        player.emit('game_created', { gid: this.id });
        this.updateBoard();
    }

    addPlayer(player) {
        if (players.length < 2) {
            this.players.push(player);
            player.emit("game_joined", { gid: this.id });
            this.updateBoard();
        }
    }

    movePiece(caller, id, to, e) {
        if (caller == this.turn) {
            let piece = this.board.findPiece(id);
            let x, y = to;
            piece.moveTo(x, y, e);
            this.changeTurn();
        }
    }
    
    changeTurn() {
        if (this.turn.id == this.players[0].id) {
            this.turn = this.players[1];
        } else {
            this.turn = this.players[0];
        }
        this.turn.emit("turn_ready");
    }

    serializeBoard() {
        this.board.board.forEach(row => {
            row.forEach(col => {
                col.pieces.forEach(piece => {
                    piece.board = undefined;
                });
            });
        });
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

    updateBoard() {
        this.serializeBoard();
        this.players.forEach(socket => socket.emit("board_update", { board: this.board }));
        this.deserializeBoard();
    }
}

module.exports = { Game };