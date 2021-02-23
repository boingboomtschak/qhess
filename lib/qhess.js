const BOARD_SIZE = 8;
const VALID_COLORS = ["BLACK", "WHITE"];
const KNIGHT_X = [ 2, 1, -1, -2, -2, -1, 1, 2 ]; 
const KNIGHT_Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ]; 
const EMPTY_SPACE = "0"

// TODO:
// take out position, and implement id
// pawn depends on color of piece
// apply probability functions to valid positions
// validation of moves on moveto() functions 

class Board {
    constructor() {
        this.board = [];
        for(let i = 0; i < BOARD_SIZE; i++){
            this.board.push([]);
            for(let j = 0; j < BOARD_SIZE; j++)
                this.board[i].push(new Space(i, j));
        }
        let backRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[0][i].addPiece(new backRow[i](0, i, "BLACK", this));
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[1][i].addPiece(new Pawn(1, i, "BLACK", this));
        // add white pieces
        for(let i = 0; i < BOARD_SIZE; i++) 
            this.board[6][i].addPiece(new Pawn(6, i, "WHITE", this));
        for(let i = BOARD_SIZE-1; i >= 0; i--) 
            this.board[7][i].addPiece(new backRow[i](7, i, "WHITE", this));
    }

    hasPieceAt(x, y) {
        return !(this.board[x][y] === undefined) && this.board[x][y].pieces.length > 0;
    }

    findPiece(id) {
        return this.board.flatten().find(sp => sp.find(id));
    }


    movePieceTo(id, x, y) {
        let piece = findPiece(id);
        if (piece != undefined) {
            // Find starting and ending spaces
            let startSpace = board[piece.pos.x][piece.pos.y];
            let endSpace = board[x][y];
            // Find index of piece in starting space pieces
            let startIndex = startSpace.pieces.findIndex(p => { p.id == id });
            // Remove piece from starting space
            startSpace.pieces.splice(startIndex, 1);
            // Add piece to new space
            endSpace.pieces.push(piece);
        }
    }

    printBoard(){
        for(let i = 0; i < BOARD_SIZE; i++){
            console.log(this.board[i]);
        }
    }
}

// Board Class
class Space {
    constructor(x, y) {
        this.pos = { x, y };
        this.pieces = [];
        this.prob = 0;
    }

    addPiece(piece) {
        this.pieces.push(piece);
    }

    getValidMoves() {
        let moves = [];
        this.pieces.forEach(p => {
            moves.push(p.getValidMoves(p.pos.x,p.pos.y));
        })
        return moves;
    }
    find(id) {
        return this.pieces.find(p => p.id == id);
    }
}

// Piece Classes
class Piece {
    constructor(x, y, c, B) {
        this.pos = { x, y };
        this.color = c;
        this.board = B;
        this.id = uuidv4();
        this.name = "";
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
        // check northwests
        for(let i = row, j = col; i < BOARD_SIZE && j >= 0; i++, j--)
            validMoves.push([i, j]);
        // check southwest
        for(let i = row, j = col; i >= 0 && j >= 0; i--, j--)
            validMoves.push([i, j]);
        validMoves = validMoves.filter(move => move[0]!=row && move[1]!=col);
        validMoves = validMoves.filter(move => !(move[0] == this.pos.x && move[1] == this.pos.y));
        moves.push([row,col]);
        return validMoves;
    }

    validPieceVertical(row, col){
        let validMoves = []
        for(let it = 0; it < BOARD_SIZE; it++) validMoves.push([it, col]);
        validMoves = validMoves.filter(move => !(move[0] == this.pos.x && move[1] == this.pos.y));
        moves.push([row,col]);
        return validMoves;
    }

    validPieceHorizontal(row, col){
        let validMoves = []
        for(let it = 0; it < BOARD_SIZE; it++) validMoves.push([row, it]);
        validMoves = validMoves.filter(move => !(move[0] == this.pos.x && move[1] == this.pos.y));
        moves.push([row,col]);
        return validMoves;
    }


}

class Pawn extends Piece {
    constructor(x, y, c, b) {
        super(x, y, c, b);
        this.name = "pawn";
    }
    // Called on client
    getValidMoves() {
        let moves = [];
        if(this.color == 'BLACK'){
            for(let i = this.pos.x+1; i < BOARD_SIZE; i++){
                if(this.board.hasPieceAt(i, this.pos.y)) break;
                moves.push([i, this.pos.y]);
            }
            if(this.board.hasPieceAt(this.pos.x+1, this.pos.y-1) && this.board.board[this.pos.x+1][this.pos.y-1].pieces[0].color == 'WHITE') 
                moves.push([this.pos.x+1, this.pos.y-1]);
            if(this.board.hasPieceAt(this.pos.x+1, this.pos.y+1) && this.board.board[this.pos.x+1][this.pos.y+1].pieces[0].color == 'WHITE')
                moves.push([this.pos.x+1, this.pos.y+1]);
        } else {
            for(let i = this.pos.x-1; i >= 0; i--){
                if(this.board.hasPieceAt(i, this.pos.y)) break;
                moves.push([i, this.pos.y]);
            }
            if(this.board.hasPieceAt(this.pos.x+1, this.pos.y-1) && this.board.board[this.pos.x+1][this.pos.y-1].color == 'BLACK') 
                moves.push([this.pos.x+1, this.pos.y+1]);
            if(this.board.hasPieceAt(this.pos.x+1, this.pos.y-1) && this.board.board[this.pos.x+1][this.pos.y-1].color == 'BLACK')
                moves.push([this.pos.x+1, this.pos.y+1]);
        } // filter all the moves that are not in bounds;
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        return moves;
    }
    // Called on server
    moveTo(x, y, e) {
        let validMoves = this.getValidMoves();
        let listOfBarriers = generateBarriers(this.board, validMoves, [this.pos.x, this.pos.y], [x, y]);
        let calculatedMove = calculateMove(this.board, validMoves, listOfBarriers, e);
        this.board.movePieceTo(this.id, calculatedMove[0], calculatedMove[1]);
    }
}

class Bishop extends Piece {
    constructor(x, y, c, b) {
        super(x, y, c, b);
        this.name = "bishop";
    }
    // Called on client
    getValidMoves() {
        let moves = super.validPieceDiagonals(this.pos.x, this.pos.y);
        return moves;
    }
    // Called on server
    moveTo(x, y, e) {
        /* let moves = this.getValidMoves();
        // check which diagonal
        if(!moves.contains([x,y])) return;
        let slope = (x-this.pos.x)/(y-this.pos.y);
        if(slope > 0){
            moves.filter(move => {
                let slope = (move[0]-this.pos.x)/(move[1]-this.pos.y);
                return slope > 0;
            })
        }
        else if(slope < 0){
            moves.filter(move => {
                let slope = (move[0]-this.pos.x)/(move[1]-this.pos.y);
                return slope < 0;
            })
        } */
    }
}

class Rook extends Piece {
    constructor(x, y, c) {
        super(x, y, c);
        this.name = "rook";
    }
    // Called on client
    getValidMoves() {
        let moves = super.validPieceHorizontal(this.pos.x, this.pos.y);
        moves = moves.concat(super.validPieceVertical(this.pos.x, this.pos.y));
        return moves;
    }
    // Called on server
    moveTo(x, y, e) {

    }
}

class Knight extends Piece {
    constructor(x, y, c, b) {
        super(x, y, c, b);
        this.name = "knight";
    }
    // Called on client
    getValidMoves() {
        let moves = [];
        for(let i = 0; i < KNIGHT_X.length && i < KNIGHT_Y.length; i++)
            moves.push([this.pos.x+KNIGHT_X[i], this.pos.y+KNIGHT_Y[i]]);
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        return moves;
    }
    // Called to server
    moveTo(x, y, e) {

    }
}

class Queen extends Piece {
    constructor(x, y, c, b) {
        super(x, y, c, b);
        this.name = "queen";
    }
    // Called on client
    getValidMoves() {
        let moves = super.validPieceDiagonals(this.pos.x, this.pos.y);
        moves = moves.concat(super.validPieceHorizontal(this.pos.x, this.pos.y));
        moves = moves.concat(super.validPieceVertical(this.pos.x, this.pos.y));
        return moves;
    }
    // Called on server
    moveTo(x, y, e) {

    }
}

class King extends Piece {
    constructor(x, y, c, b) {
        super(x, y, c, b);
        this.name = "king";
    }
    // Called on client
    getValidMoves() {
        let moves = [];
        for(let x = -1; x <= 1; x++){
            for(let y = -1; y <= 1; y++) 
                moves.push([this.pos.x+x,this.pos.y+y]);
        }
        moves = moves.filter(move => !move.some(m => m >= BOARD_SIZE || m < 0));
        moves = moves.filter(move => !(move[0] == this.pos.x && move[1] == this.pos.y));
        return moves;
    }
    // Called on server
    moveTo(x, y, e) {

    }
}

function Wave(x,E,T){
    return Math.sin((Math.PI*x*E)/(T));
}

function Barrier(x,P,A,D){
    return Math.pow(1+Math.pow(Math.E, (Math.pow(-1, D-1)*4*(x-P+Math.pow(-1,D)*0.5+(1-D)))),-1)*A+(1-A)
}

/* function Probability(pos,E,T,P,A,D){
    return Math.pow(W(pos,E,T)*B(pos,P,A,D), 2);
} */

// listOfBarriers = [{ P: 3, D: 0 }, { P: 7, D: 1 }]
// listOfMoves = [space1, space2, space3, space4]
function generateBarriers(board, listOfMoves, currentPos, desiredPos) {
    let currentIndex = listOfMoves.findIndex(m => m == currentPos);
    //let desiredIndex = listOfMoves.findIndex(m => m == desiredPos);
    let barrierSpaces = listOfMoves.map(m => { if (board.hasPieceAt(m)) { return board[x][y]; } else { return undefined; } })
    barrierSpaces.filter(s => s != undefined);
    let barriers = barrierSpaces.map(sp => {
        let spaceIndex = listOfMoves.findIndex(m => m == [sp.pos.x, sp.pos.y]);
        let dir;
        if (spaceIndex > currentIndex && spaceIndex != currentIndex) { dir = 1; } else { dir = 0; }
        return { P: spaceIndex, D: dir };
    })
    return barriers;
}

function calculateMove(listOfMoves, listOfBarriers, E) {
    let cdf = generateCDF(listofMoves.length, listOfBarriers, E);
    let moveIndex = observe(cdf);
    let nextSpace = listOfMoves(moveIndex);
    return nextSpace;
}

function generateCDF(numOfMoves, listOfBarriers, E){
    const A = 0.5;
    let range = [];
    let domain = [];
    let interval = 0.05;
    for(let i = 0; i < numOfMoves; i += interval){
        domain.push(i);
        let overallFn = listOfBarriers.reduce((product, currBarrier) => {
            return product*B(i, currBarrier.P, A, currBarrier.D);
        }, W(i, E, numOfMoves.length));
        range.push(Math.pow(overallFn, 2));
    }
    for(let i = 1; i < range.length; i++) {
        range[i] += range[i-1];
    }
    return { domain, range };
}

function observe(cdf) {
    let { domain, range } = cdf;
    let maxVal = range[range.length-1];
    let observed = Math.random() * maxVal;
    let i = 0;
    while(observed < range[i]) {
        i++;
    }
    return Math.floor(domain[i]);
}

// listOfBarriers = [{ P: 3, D: 0 }, { P: 7, D: 1 }]
// listOfMoves = [space1, space2, space3, space4]
// cdf = generateCDF(listOfMoves, listOfBarriers, E)
// moveIdx = observe(cdf);
// nextSpace = listOfMoves[moveIdx];

function generateCDF(listOfMoves, listOfBarriers, E){
    const A = 0.5;
    let range = [];
    let domain = [];
    let interval = 0.05;
    for(let i = 0; i < listOfMoves.length; i += interval){
        domain.push(i);
        let overallFn = listOfBarriers.reduce((product, currBarrier) => {
            return product*B(i, currBarrier.P, A, currBarrier.D);
        }, W(i, E, listOfMoves.length));
        range.push(Math.pow(overallFn, 2));
    }
    for(let i = 1; i < range.length; i++) {
        range[i] += range[i-1];
    }
    return { domain, range };
}

function observe(cdf) {
    let { domain, range } = cdf;
    let maxVal = range[range.length-1];
    let observed = Math.random() * maxVal;
    let i = 0;
    while(observed < range[i]) {
        i++;
    }
    return Math.floor(domain[i]);
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}  

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = { Space, Board, Piece, Pawn, Bishop, Rook, Knight, Queen, King, Wave, Barrier, uuidv4 };