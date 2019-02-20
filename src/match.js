import exists from './exists'
import GameState from './game_state'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.error = null;
  }

  playersTurn(playerNumber) { 
    return this.gameState.playersTurn(playerNumber);
  }

  playersName(number) { 
    let index = number - 1;
    return this.players[index].name;
  }

  currentPlayerName() {
    return this.playersName(this.gameState.currentPlayerNumber);
  }

  winnerName() {
    if (exists(this.winner)) {
      return this.playersName(this.winner);
    } else {
      return null;
    }
  } 

  selectedPoint() {
    return this.gameState.selectedPoint();
  }

  rollPhase() {
    return this.gameState.rollPhase();
  }

  movePhase() {
    return this.gameState.movePhase();
  }

  findPoint(pointNumber) {
    return this.gameState.findPoint(pointNumber);
  }

  barPlayerOne() {
    return this.gameState.bar.piecesOwnedByPlayer(1);
  }

  barSelected() {
    return this.gameState.bar.selected;
  }

  barPlayerTwo() {
    return this.gameState.bar.piecesOwnedByPlayer(2);
  }

  offBoardPlayerOne() {
    return this.gameState.offBoard.piecesOwnedByPlayer(1);
  }

  offBoardSelected() {
    return this.gameState.offBoard.selected;
  }

  offBoardPlayerTwo() {
    return this.gameState.offBoard.piecesOwnedByPlayer(2);
  }

  passable(playerNumber) { 
    let playersTurn = this.playersTurn(playerNumber);
    let movePhase = this.movePhase();
    let noMoves = this.gameState.noMovesForPlayer(playerNumber);
    let unusedDice = this.gameState.dice.unused().length() > 0;
    return playersTurn && movePhase && noMoves && unusedDice;
  }
}

export default Match
