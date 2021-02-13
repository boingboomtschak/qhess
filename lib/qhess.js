const BOARD_SIZE = 8;
const VALID_COLORS = ["BLACK", "WHITE"];
const EMPTY_SPACE = '0'

// Board Class
class Space {
    constructor() {
        this.pieces = [];
    }
    addPiece(piece) {

    }
    removePiece(piece) {

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
        this.board = [[]];
    }
    hasPieceAt(x, y) {
        return this.board[x][y] == EMPTY_SPACE;
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
    getValidMoves(B) {
        moves = [];
        row = this.x;
        col = this.y;
        while(this.x < BOARD_SIZE && this.y < BOARD_SIZE && !B.hasPiece(row, col))
            moves.push([row, col]);
        if(B.hasPiece(this.x+1, this.y+1)) moves.push([this.x+1, this.y+1]);
        if(B.hasPiece(this.x-1, this.y+1)) moves.push([this.x-1, this.y+1]);
    }
    // Called on server
    moveTo(x, y) {
        
    }
}

class Bishop extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(B) {
        moves = [];
    }
    // Called on server
    moveTo(x, y) {

    }
}

class Rook extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(B) {
        moves = [];
    }
    // Called on server
    moveTo(x, y) {

    }
}

class Knight extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(B) {

    }
    // Called to server
    moveTo(x, y) {

    }
}

class Queen extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(B) {

    }
    // Called on server
    moveTo(x, y) {

    }
}

class King extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(board) {

    }
    // Called on server
    moveTo(x, y) {

    }
}

// Functions

function renderBoard() {

}

