const BOARD_SIZE = 8;
const VALID_COLORS = ["BLACK", "WHITE"];
const KNIGHT_X = [ 2, 1, -1, -2, -2, -1, 1, 2 ]; 
const KNIGHT_Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ]; 
const EMPTY_SPACE = '0'

class Board {
    constructor() {
        this.board = [];
        this.emptyRow = [];
        for(let i = 0; i < BOARD_SIZE; i++){
            this.board.push([]);
            for(let j = 0; j < BOARD_SIZE; j++){
                this.board[i].push(new Space());
            }
        }
        let backRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[0][i].addPiece(new backRow[i](0, i, 'BLACK'));
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[1][i].addPiece(new Pawn(1, i, "BLACK"));
        // add white pieces
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[6][i].addPiece(new Pawn(6, i, 'WHITE'));
        for(let i = BOARD_SIZE-1; i >= 0; i--) 
            this.board[7][i].addPiece(new backRow[i](7, i, 'WHITE'));
    }
    hasPieceAt(x, y) {
        return typeof this.board[x][y] != typeof (new Space());
    }
    printBoard(){
        for(let i = 0; i < BOARD_SIZE; i++){
                console.log(this.board[i]);
        }
    }
}

// Board Class
class Space {
    constructor() {
        this.pieces = [];
    }

    addPiece(piece) {
        this.pieces.push(piece);
    }

    removePiece(piece) {
        this.pieces = this.pieces.filter(p => !(p === piece));
    }

    getValidMoves(B) {
        let moves = [];
        this.pieces.forEach(p => {
            moves.push(p.getValidMoves(B));
        })
        return moves;
    }
    
}

// Piece Classes
class Piece {
    constructor(x, y, c) {
        this.pos = { x, y };
        this.color = c;
    }
    // Functions
    validPieceDiagonals(row, col){
        let validMoves = [];
        // check northeast
        for(let i = row, j = col; i >= 0 && j < BOARD_SIZE; i--, j++)
            validMoves.push([i, j]);
        // check southeast
        for(let i = row, j = col; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++)
            validMoves.push([i, j]);
        // check northwest
        for(let i = row, j = col; i < BOARD_SIZE && j >= 0; i++, j--)
            validMoves.push([i, j]);
        // check southwest
        for(let i = row, j = col; i >= 0 && j >= 0; i--, j--)
            validMoves.push([i, j]);
        return validMoves;
    }

    validPieceVertical(row, col){
        let validMoves = []
        for(let it = 0; it < BOARD_SIZE; it++) validMoves.push([it, col]);
        return validMoves;
    }

    validPieceHorizontal(row, col){
        let validMoves = []
        for(let it = 0; it < BOARD_SIZE; it++) validMoves.push([row, it]);
        return validMoves;
    }
}

class Pawn extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
    }
    // Called on client
    getValidMoves(B) {
        let moves = [];
        for(let i = this.pos.y+1; i < BOARD_SIZE; i++){
            if(B.hasPieceAt(this.pos.x, i)) break;
            moves.push([this.pos.x, i]);
        }
        if(B.hasPieceAt(this.pos.x+1, this.pos.y+1)) 
            moves.push([this.pos.x+1, this.pos.y+1]);
        if(B.hasPieceAt(this.pos.x-1, this.pos.y+1))
            moves.push([this.pos.x-1, this.pos.y+1]);
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
        let moves = super.validPieceDiagonals(B, this.pos.x, this.pos.y);
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
        let moves = super.validPieceHorizontal(B, this.pos.x, this.pos.y);
        moves = moves.concat(super.validPieceVertical(B, this.pos.x, this.pos.y));
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
        let moves = [];
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
        let moves = super.validPieceDiagonals(B, this.pos.x, this.pos.y);
        moves = moves.concat(super.validPieceHorizontal(B, this.pos.x, this.pos.y));
        moves = moves.concat(super.validPieceVertical(B, this.pos.x, this.pos.y));
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
        let moves = [];
        for(let x = -1; x < 1; x++){
            for(let y = -1; y < 1; y++) 
                moves.push([this.pos+x,this.pos+y]);
        }
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        return moves;
    }
    // Called on server
    moveTo(x, y) {

    }
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

module.exports = { Space, Board, Piece, Pawn, Bishop, Rook, Knight, Queen, King, Wave, Barrier, Probability };