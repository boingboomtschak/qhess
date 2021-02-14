import React, { Component } from "react";
import "./Space.css";
import { uuidv4 } from "../../../../lib/qhess";
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
        // none selected, highlight valid moves for selected space
        if(this.props.client.noneSelected()) {
            this.props.client.selectedSpace.x = this.props.space.pos.x;
            this.props.client.selectedSpace.y = this.props.space.pos.y;
            this.props.client.highlightValidMoves(this.props.space);
        // already selected current space, deselect it and unhighlight
        } else if(this.props.client.isSelectedSpace(this.props.space)) {
            console.log("HERE")
            this.props.client.selectedSpace.x = null;
            this.props.client.selectedSpace.y = null;
            this.props.client.unhighlightValidMoves();
        // selected another space, check if current space is valid move
        } else if(!this.props.client.noneSelected()) {
            let validMoves = this.props.space.getValidMoves(this.board).flat();
            let isValidMove = validMoves.some(move => 
                move[0] == this.props.space.pos.x && move[1] == this.props.space.pos.y
            );
            if(isValidMove) {
                this.props.client.unhighlightValidMoves();
            }
        }
        
    }
    render() {
        let pieces = this.props.space.pieces;
        let brightness = (100 - 50 * this.props.space.prob);
        let noneSelected = this.props.client.noneSelected();
        let validMoves = this.props.space.prob > 0;
        let cursor = noneSelected || validMoves ? "pointer" : "default";
        let style = { backgroundColor: `hsl(147, 50%, ${brightness}%)`, cursor: cursor };
        if(this.props.client.isSelectedSpace(this.props.space)) {
            style.backgroundColor = `hsl(208, 50%, 50%)`;
            style.cursor = "pointer";
        }
        return (<div className="Space" onClick={this.handleClick} style={style}>
            {pieces.map(piece => (
                <img src={icons[piece.name][piece.color]} key={uuidv4()} />
            ))}
        </div>);
    }
}

export default Space;
