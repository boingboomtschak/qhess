const { v4 : uuid } = require('uuid');
const { Board } = require('../lib/qhess.js');
const io = require('socket.io');

class Game {
    constructor(player) {
        this.id = uuid();
        this.ip = player.handshake.address;
        this.turn = player.id;
        this.players = [player.id];
        this.board = new Board();
    }

    addPlayer(player) {
        if (players.length < 2) {
            this.players.push(player.id);
            io.sockets.socket(player.id).emit('game_joined', { gid: this.id });
        }
    }

    movePiece(id, to, e) {
        let piece = this.board.findPiece(id);
        let x, y = to;
        piece.moveTo(x, y, e);
        this.changeTurn();
    }
    
    changeTurn() {
        if (this.turn == this.players[0]) {
            this.turn = this.players[1];
        } else {
            this.turn = this.players[0];
        }
    }

    updateBoard() {
        this.players.forEach(p => io.sockets.socket(p).emit('board_update', this.board.board));
    }
}

module.exports = { Game };