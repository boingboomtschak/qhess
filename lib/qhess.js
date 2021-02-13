const BOARD_SIZE = 8;
const VALID_COLORS = ["BLACK", "WHITE"];

// Board Class

class Space {
    constructor() {
        this.pieces = [];
    }
    addPiece() {

    }
    removePiece() {

    }
    getValidMoves() {
        moves = [];
        this.pieces.forEach(p => {
            moves.push(p.getValidMoves());
        })

    }
}

class Board {
    constructor() {
        this.board = [[[]]];
    }
}

// Piece Classes

class Piece {
    constructor(x, y, c) {
        this.pos = [x, y];
        this.color = c;
    }
}

class Pawn extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called on server
    moveTo() {

    }
}

class Bishop extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called on server
    moveTo() {

    }
}

class Rook extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called on server
    moveTo() {

    }
}

class Knight extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called to server
    moveTo() {

    }
}

class Queen extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called on server
    moveTo() {

    }
}

class King extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves() {

    }
    // Called on server
    
}

// Functions

function renderBoard() {

}

