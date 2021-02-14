import React, { Component } from "react";
import "./App.css";
import Board from "../Board/Board";
import Control from "../Control/Control";
import Client from "../../qhess-client.js";

class App extends Component {
    client = new Client();
    render() {
        return (<div className="App">
            <header className="App-header">
                <h1>Qhess</h1>
            </header>
            <div className="App-body">
                <Board board={this.client.getBoard()} />
                <Control />
            </div>
        </div>);
    }
}

export default App;