const { v4 : uuid } = require('uuid');

class Game {
    constructor(player) {
        this.turn = player.id;
        this.players = [player];
        this.board;
    }
    addPlayer(player) {

    }
    movePiece() {

    }
    changeTurn() {

    }

}

class Player {
    static id = uuid();
    constructor() {
        
    }

}

export { Game, Player };