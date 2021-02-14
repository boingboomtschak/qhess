import React, { Component } from "react";
import "./Space.css";
import pawn_thin from "../../../../ast/pawn_thin.svg";
import rook_thin from "../../../../ast/rook_thin.svg";
import knight_thin from "../../../../ast/knight_thin.svg";
import bishop_thin from "../../../../ast/bishop_thin.svg";
import queen_thin from "../../../../ast/queen_thin.svg";
import king_thin from "../../../../ast/king_thin.svg";
import pawn_thicc from "../../../../ast/pawn_thicc.svg";
import rook_thicc from "../../../../ast/rook_thicc.svg";
import knight_thicc from "../../../../ast/knight_thicc.svg";
import bishop_thicc from "../../../../ast/bishop_thicc.svg";
import queen_thicc from "../../../../ast/queen_thicc.svg";
import king_thicc from "../../../../ast/king_thicc.svg";

var icons = {
    pawn: { WHITE: pawn_thin, BLACK: pawn_thicc },
    rook: { WHITE: rook_thin, BLACK: rook_thicc },
    knight: { WHITE: knight_thin, BLACK: knight_thicc },
    bishop: { WHITE: bishop_thin, BLACK: bishop_thicc },
    queen: { WHITE: queen_thin, BLACK: queen_thicc },
    king: { WHITE: king_thin, BLACK: king_thicc }
};

class Space extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = (e) => {
        e.preventDefault();
        this.props.client.initBoard();
        console.log(this.props.space.getValidMoves(this.props.board));
    }
    render() {
        let pieces = this.props.space.pieces;
        return (<div className="Space" onClick={this.handleClick}>
            {pieces.map(piece => (
                <img src={icons[piece.name][piece.color]} />
            ))}
        </div>);
    }
}

export default Space;
