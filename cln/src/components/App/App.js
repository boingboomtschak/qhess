import React, { Component } from "react";
import "./App.css";
import Board from "../Board/Board";
import Control from "../Control/Control";
import Client from "../../qhess-client.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { client: new Client(this.stateHandler), board: null };
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
                <Board client={this.state.client} />
                <Control />
            </div>
        </div>);
    }
}

export default App;