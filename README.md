# Qhess

![GitHub top language](https://img.shields.io/github/languages/top/d-mckee/qhess?color=244d70&style=flat&logo=python) ![GitHub last commit](https://img.shields.io/github/last-commit/d-mckee/qhess?style=flat) ![GitHub repo size](https://img.shields.io/github/repo-size/d-mckee/qhess?style=flat) 

A twist on the classic game of chess, using probabilistic equations to determine where pieces will move, as well as including various rules inspired by concepts of quantum mechanics.

## Summary

#### What is Qhess?

Qhess is a probabilistic twist on the classic game of chess. Created as part of HackSU, run by the SeattleU ACM, where the theme was "interesting twists on classic games." Taking inspiration from certain concepts in quantum mechanics, our goal was not only to shake up the rules of traditional chess, but to introduce a new gameplay aspect that shakes up regular strategies.

#### How does it differ from regular chess?

While many rules are kept from regular chess*, the introduction of new mechanics has required a change to some regular game rules. However, the biggest change introduced by the game is the movement of pieces in a probabilistic manner. In regular chess, pieces are moved deterministically; at each move, their start point, end point, and possible spaces to move to are known. However, in Qhess, we instead govern the movement of pieces by a wave function, whose values are interpreted as a set of probabilities determining where each piece will land.

<sub>* In fact, as many rules as we felt possible to keep while still keeping the game fair and balanced!</sub>

#### Special Rules/Features

Along with the probabilistic movement system, Qhess includes a couple of special features that enhance the game and the connections to quantum mechanics further.

##### Superposition:

- If two pieces occupy the same position, they are said to be in superposition.
- On a player's turn, they can choose any one of the pieces in that space, and the moving piece takes on the movement capabilities of any other pieces in the space.
- For example, if a rook and bishop are in the same space, moving either the rook or the bishop will allow the player to attempt to move their piece both in the horizontal/vertical directions and the diagonals.

##### Quantum Tunneling:

- When moving, pieces have a probability of "tunneling" behind a blocking enemy piece due to the continuance of the wave function that governs their movement.
- However, this only happens rarely, as every enemy piece in the way creates a potential barrier that is applied to the resulting wave function, which significantly lowers the probability of moving to those spaces.

## Technologies

#### Main Library

Driving most of the game's interactions and ruleset is the main library. Found in `lib/qhess.js`, it contains the main classes for the game, such as the Board, Space, Piece, and classes for each type of chess piece. By containing the rule set for the game within these classes, we can share code between client and server for security and minimized development time.

#### Client

Qhess' frontend is built on top of [React](https://reactjs.org/), and many components found in the main library are abstracted into React components. These components include the main App, the Board, Spaces, Controls, and horizontal/vertical labels (HLabel/VLabels).

To connect the client to the server and pass information back and forth, the [Socket.io](https://socket.io/) library is used. This allows for quick and robust messages to be passed between the server and all connected clients, and for data to be relatively easily serialized and deserialized.

On top of that, the React components utilize a Client class, found in `cln/qhess-client.js`. This class contains important code from the main library, handles the client's Socket.io connection to the server, and responds to events received.

#### Server

Qhess' backend is built using a [Node.js](https://nodejs.org/) app, and uses [Express](https://expressjs.com/) to serve production-ready builds of the client files. The server also implements its own Game class, found in `srv/qhess-server.js`, which handles game state, implements the common game library, and sends messages to each connected player.

Similar to the client, the server backend passes information to all connected clients using [Socket.io](https://socket.io/). By managing connections using this library, we can robustly keep track of game states, player states, and quickly serialize and deserialize data such as updates to the board.

To keep the game secure and lessen the possibility for cheating, the server backend both handles game state and tests incoming moves against the common  `lib/qhess.js` library used by the client. This allows for changes to the game's rules to be made easily in the development process, and for client and server to see the same set of valid moves.

## Usage

#### Production

TBD! Initial deployment will happen after project reaches workable state.

#### Development

##### Requirements:

- Installed Node.js binaries

To set up Qhess for development, there are a couple steps to take depending on whether you want to run with the development server for React or compile the frontend into static files so you can focus on the backend code.

First, you will need to clone the repository to your local machine and install dependencies like so:

```bash
git clone https://github.com/d-mckee/qhess
cd qhess/srv && npm run setup
```

Then, follow the instructions for your preferred development server.

##### Development Server

To work on React development, you will need to have two terminal sessions open to run both the server backend and the React server. 

First, you should navigate to the server directory and run the server backend lazily (doesn't compile React pages):

```bash
cd srv
npm run lazy
```

Then, in your second terminal session, navigate to the client directory and run the React development server:

```bash
cd cln
npm start
```

Then, you should be able to navigate to `localhost:3000` to see the rendered React docs.

##### Production Server

To work on backend development, it can be easier to render the React files once, then serve them statically as the server is spun up and down repeatedly.

To do this, you should navigate to the server folder, then start it up to cause the React files to be compiled to `cln/build`, which will then launch the rest of the backend.

```bash
cln srv
npm start
```

You should then be able to navigate to `localhost:8080` to see the production React files and your terminal session will be running the server backend.

Alternately, to skip compiling React docs each time:

```bash
npm run lazy
```

