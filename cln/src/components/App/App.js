import React, { Component } from 'react';
import * as math from 'mathjs';
import './App.css';
import Board from '../Board/Board';
import Control from '../Control/Control';
const { Board: MyBoard } = require('../../../../lib/qhess');

class App extends Component {
    render() {
        return (<div className="App">
            <header className="App-header">
                <h1>Qhess</h1>
            </header>
            <div className="App-body">
                <Board board={new MyBoard()} />
                <Control />
            </div>
        </div>);
    }
}

export default App;