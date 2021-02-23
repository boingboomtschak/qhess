import React, { Component } from "react";
import "./App.css";
import Board from "../Board/Board";
import Control from "../Control/Control";
import Client from "../../qhess-client.js";

class App extends Component {

    constructor(props) {
        super(props);
        this.client = new Client(this.stateHandler);
        this.state = { update: false };
    }

    stateHandler = state => {
        this.setState(state)
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                <h1>Qhess</h1>
            </header>
            <div className="App-body">
                <Board client={this.client} />
                <Control client={this.client} />
            </div>
        </div>);
    }
}

export default App;