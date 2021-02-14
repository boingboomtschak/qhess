import React, { Component } from "react";
import * as math from "mathjs";
import Space from "../Space/Space";
import { Space as QSpace, uuidv4 } from "../../../../lib/qhess";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(!!this.props.client.board) {
            console.log("A");
            return (<div className="ChessBoard">
                {this.props.client.board.board.flat().map(space => 
                    <Space client={this.props.client} space={space} key={uuidv4()} />
                )}
            </div>);
        } else {
            return (<div className="ChessBoard">
                {math.range(0, 64, 1).toArray().map(() => 
                    <Space client={this.props.client} space={new QSpace()} key={uuidv4()} />
                )}
            </div>);
        }
    }
}

export default ChessBoard;
