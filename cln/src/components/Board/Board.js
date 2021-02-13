import React, { Component } from 'react';
import './Board.css';
import VLabels from './VLabels';
import HLabels from './HLabels';
import Space from '../Space/Space';

let myArr = new Array(64);

class Board extends Component {
    render() {
        return (<div className="Board">
            <div className="ChessBoardWithVLabels">
                <VLabels vLabels={['8', '7', '6', '5', '4', '3', '2', '1']} />
                <div className="ChessBoard">
                    {this.props.board.map(num => <Space />)}
                </div>
            </div>
            <HLabels hLabels={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']} />
        </div>);
    }
}

export default Board;
