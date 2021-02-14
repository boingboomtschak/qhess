import React, { Component } from 'react';
import * as math from 'mathjs';
import './App.css';
import Board from '../Board/Board';
import Control from '../Control/Control';
const { Pawn, Bishop, Rook, Knight, Queen, King } = require('../../../../lib/qhess');

let testBoard = [];

// add black pieces
let backRow = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
for(let i = 0; i < 8; i++) {
    testBoard.push(new backRow[i](0, i, 'BLACK'));
}
for(let i = 0; i < 8; i++) {
    testBoard.push(new Pawn(1, i, 'BLACK'));
}

// add blank pieces
for(let i = 0; i < 8*4; i++) {
    testBoard.push(null);
}

// add white pieces
for(let i = 0; i < 8; i++) {
    testBoard.push(new Pawn(6, i, 'WHITE'));
}
for(let i = 7; i >= 0; i--) {
    testBoard.push(new backRow[i](7, i, 'WHITE'));
}

class App extends Component {
    render() {
        return (<div className="App">
            <header className="App-header">
                <h1>Qhess</h1>
            </header>
            <div className="App-body">
                <Board board={testBoard} />
                <Control />
            </div>
        </div>);
    }
}

export default App;