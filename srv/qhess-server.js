//const { v4 : uuid } = require('uuid');
const { Board } = requires('../lib/qhess.js');
const io = require('socket.io');

class Game {
    constructor(player) {
        this.turn = player.id;
        this.players = [player.id];
        this.board = new Board();
    }
    addPlayer(player) {
        if (players.length < 2) {
            this.players.push(player.id);
        }
    }
    movePiece() {
        
    }
    changeTurn() {
        
    }

}

export { Game };