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
        return this.board[x][y] != EMPTY_SPACE;
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
        moves = validPieceHorizontal(B, this.x, this.y);
        if(B.hasPieceAt(this.x+1, this.y+1)) moves.push([this.x+1, this.y+1]);
        if(B.hasPieceAt(this.x-1, this.y+1)) moves.push([this.x-1, this.y+1]);
        return moves;
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
        moves = validPieceDiagonals(B, this.x, this.y);
        return moves;
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
        moves = validPieceHorizontal(B, this.x, this.y);
        moves = moves.concat(validPieceVertical(B, this.x, this.y));
        return moves;
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
        moves = validPieceDiagonals(B, this.x, this.y);
        moves = moves.concat(validPieceHorizontal(B, this.x, this.y));
        moves = moves.concat(validPieceVertical(B, this.x, this.y));
        return moves;
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
        moves = [];
        
    }
    // Called on server
    moveTo(x, y) {

    }
}

// Functions
function validPieceDiagonals(row, col){
    validMoves = []
    for(i = BOARD_SIZE-col-1; i < BOARD_SIZE; i++){
        for(j = BOARD_SIZE-row-1; j < BOARD_SIZE; j++) validMoves.push([i,j]);
    }
    for()
    return validMoves;
}

function validPieceVertical(row, col){
    validMoves = []
    for(it = 0; it < BOARD_SIZE; it++) validMoves.push([it, col]);
    return validMoves;
}

function validPieceHorizontal(row, col){
    validMoves = []
    for(it = 0; it < BOARD_SIZE; it++) validMoves.push([row, it]);
    return validMoves;
}

function renderBoard() {

}

