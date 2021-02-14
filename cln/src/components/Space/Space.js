import React, { Component } from 'react';
import './Space.css';
import { uuidv4 } from '../../../../lib/qhess';
import pawn_thin from '../../../../ast/pawn_thin.svg';
import rook_thin from '../../../../ast/rook_thin.svg';
import knight_thin from '../../../../ast/knight_thin.svg';
import bishop_thin from '../../../../ast/bishop_thin.svg';
import queen_thin from '../../../../ast/queen_thin.svg';
import king_thin from '../../../../ast/king_thin.svg';
import pawn_thicc from '../../../../ast/pawn_thicc.svg';
import rook_thicc from '../../../../ast/rook_thicc.svg';
import knight_thicc from '../../../../ast/knight_thicc.svg';
import bishop_thicc from '../../../../ast/bishop_thicc.svg';
import queen_thicc from '../../../../ast/queen_thicc.svg';
import king_thicc from '../../../../ast/king_thicc.svg';

var icons = {
    pawn: { thin: pawn_thin, thicc: pawn_thicc },
    rook: { thin: rook_thin, thicc: rook_thicc },
    knight: { thin: knight_thin, thicc: knight_thicc },
    bishop: { thin: bishop_thin, thicc: bishop_thicc },
    queen: { thin: queen_thin, thicc: queen_thicc },
    king: { thin: king_thin, thicc: king_thicc }
};

class Space extends Component {

    render() {
        let notEmpty = this.props.piece != null;
        if(notEmpty) {
            let player = this.props.piece.color == 'WHITE';
            return (<div className="Space">
                <img src={icons[this.props.piece.name][player ? 'thin' : 'thicc']} />
            </div>);
        } else {
            return (<div className="Space"></div>);
        }
    }
}

export default Space;
