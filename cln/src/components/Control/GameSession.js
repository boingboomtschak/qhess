import React, { Component } from "react";

class GameSession extends Component {
    constructor(props) {
        super(props);
    }
    createGame = (e) => {
        e.preventDefault();
        console.log("creating game");
        this.props.client.createGame();
    }
    joinGame = (e) => {
        e.preventDefault();
        console.log("joining game");
        console.log(this.props.client.gid);
        // this.props.client.joinGame();
    }
    render() {
        return (<form className="GameSession">
            <div id="gs1">
                <p>Game Session</p>
                <input type="text" name="gid" id="gid" value={this.props.client.gid} />
            </div>
            <div id="gs2">
                <button id="create_game" onClick={this.createGame}>Create Game</button>
                <button id="join_game" onClick={this.joinGame}>Join Game</button>
            </div>
            
        </form>);
    }
}

export default GameSession;
