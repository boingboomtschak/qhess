const BOARD_SIZE = 8;
const VALID_COLORS = ["BLACK", "WHITE"];
const KNIGHT_X = [ 2, 1, -1, -2, -2, -1, 1, 2 ]; 
const KNIGHT_Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ]; 
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
        this.pos = { x, y };
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
        for(i = this.pos.y+1; i < BOARD_SIZE; i++){
            if(B.hasPieceAt(this.pos.x, i)) break;
            moves.push([this.pos.x, i]);
        }
        if(B.hasPieceAt(this.pos.x+1, this.pos.y+1)) moves.push([this.pos.x+1, this.pos.y+1]);
        if(B.hasPieceAt(this.pos.x-1, this.pos.y+1)) moves.push([this.pos.x-1, this.pos.y+1]);
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
        moves = validPieceDiagonals(B, this.pos.x, this.pos.y);
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
        moves = validPieceHorizontal(B, this.pos.x, this.pos.y);
        moves = moves.concat(validPieceVertical(B, this.pos.x, this.pos.y));
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
        moves = [];
        KNIGHT_X.forEach(move_x => {
            KNIGHT_Y.forEach(move_y => {
                moves.push([this.x+move_x, this.y+move_y]);
            })
        })
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        return moves;
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
        moves = validPieceDiagonals(B, this.pos.x, this.pos.y);
        moves = moves.concat(validPieceHorizontal(B, this.pos.x, this.pos.y));
        moves = moves.concat(validPieceVertical(B, this.pos.x, this.pos.y));
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
        for(x = -1; x < 1; x++){
            for(y = -1; y < 1; y++) 
                moves.push([this.pos+x,this.pos+y]);
        }
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        return moves;
    }
    // Called on server
    moveTo(x, y) {

    }
}

// Functions
function validPieceDiagonals(row, col){
    validMoves = [];
    // check northeast
    for(i = row, j = col; i >= 0 && j < BOARD_SIZE; i--, j++)
        validMoves.push([i, j]);
    // check southeast
    for(i = row, j = col; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++)
        validMoves.push([i, j]);
    // check northwest
    for(i = row, j = col; i < BOARD_SIZE && j >= 0; i++, j--)
        validMoves.push([i, j]);
    // check southwest
    for(i = row, j = col; i >= 0 && j >= 0; i--, j--)
        validMoves.push([i, j]);
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

function Wave(x,E,T){
    return Math.sin((Math.PI*x*E)/(T));
}

function Barrier(x,P,A,D){
    return Math.pow(1+Math.pow(Math.E, (Math.pow(-1, D-1)*4*(x-P+Math.pow(-1,D)*0.5+(1-D)))),-1)*A+(1-A)
}

function Probability(pos,E,T,P,A,D){
    return Math.pow(W(pos,E,T)*B(pos,P,A,D), 2);
}

function renderBoard() {

}

