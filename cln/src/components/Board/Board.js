import React, { Component } from "react";
import "./Board.css";
import VLabels from "./VLabels";
import HLabels from "./HLabels";
import ChessBoard from "./ChessBoard";

class Board extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.client.initBoard();
    }
    render() {
        return (<div className="Board">
            <div className="ChessBoardWithVLabels">
                <VLabels vLabels={["8", "7", "6", "5", "4", "3", "2", "1"]} />
                <ChessBoard client={this.props.client} />
            </div>
            <HLabels hLabels={["a", "b", "c", "d", "e", "f", "g", "h"]} />
        </div>);
    }
}

export default Board;
