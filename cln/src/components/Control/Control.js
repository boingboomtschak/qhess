import React, { Component } from "react";
import "./Control.css";
import GameSession from "./GameSession";
import panel from "../../../../ast/panel.png";

class Control extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="Control">
            <GameSession client={this.props.client} />
            <img id="panel" src={panel} />
        </div>);
    }
}

export default Control;
