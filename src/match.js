import exists from './exists'
import GameState from './game_state'
import Move from './move'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.moveList = exists(args.move_list) ? args.move_list : [];
    this.lastAction = exists(args.last_action) ? args.last_action : {};
    this.notification = exists(args.notification) ? args.notification : this._defaultMessage;
  }

  get asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson,
      players: this.players,
      winner: this.winner,
      move_list: this.moveList,
      last_action: this.lastAction,
      notification: this.notification
    };
  }

  findPoint(pointNumber) {
    return this.gameState.findPoint(pointNumber);
  }

  get barPlayerOne() {
    return this.gameState.bar.piecesOwnedByPlayer(1);
  }

  get barSelected() {
    return this.gameState.bar.selected;
  }

  get barPlayerTwo() {
    return this.gameState.bar.piecesOwnedByPlayer(2);
  }

  get offBoardPlayerOne() {
    return this.gameState.offBoard.piecesOwnedByPlayer(1);
  }

  get offBoardSelected() {
    return this.gameState.offBoard.selected;
  }

  get offBoardPlayerTwo() {
    return this.gameState.offBoard.piecesOwnedByPlayer(2);
  }

  passable(playerNumber) { 
    let playersTurn = this.gameState.playersTurn(playerNumber);
    let movePhase = this.gameState.movePhase();
    let noMoves = this.gameState.noMovesForPlayer(playerNumber);
    let unusedDice = this.gameState.dice.unused.length > 0;
    return playersTurn && movePhase && noMoves && unusedDice;
  }

  // user actions

  touchDice(playerNumber) {
    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.'); 
    } else if (!this.gameState.playersTurn(playerNumber)) {
      this._notify('It is not your turn.');
    } else if (this.gameState.movePhase()) {
      this._notify('Dice have already been rolled.');
    } else if (this.gameState.rollPhase()) {
      this._addRollToLastAction();
    }
  }

  touchPoint(pointNumber, playerNumber) {
    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.'); 
    } else if (!this.gameState.playersTurn(playerNumber)) {
      this._notify('It is not your turn.');
    } else if (this.gameState.rollPhase()) {
      this._notify('Pieces cannot move until the dice are rolled.');
    } else if (this.gameState.movePhase()) {
      let selectedPoint = this.gameState.selectedPoint;
      let point = this.findPoint(pointNumber);

      if (exists(selectedPoint)) {
        let move = new Move({
          fromNumber: selectedPoint.number, 
          toNumber: point.number, 
          moveList: this.moveList, 
          playerNumber: playerNumber,
          gameState: this.gameState
        });

        if (move.valid()) {
          if (move.complete || move.allPiecesOffBoard) {
            this.gameState.deselect();
            this.gameState.move(selectedPoint.number, pointNumber, playerNumber);
            this.gameState.useDie(move.dieNumber);
            this._addMoveToLastAction(move.completeMoveList);
            this._clearMoveList();
          } else {
            this.gameState.deselect();
            this.gameState.move(selectedPoint.number, pointNumber, playerNumber);
            this.gameState.useDie(move.dieNumber);
            this._addMoveToList(move.details);
          }
        } else {
          this.gameState.deselect();
        }
      } else {
        let move = new Move({
          fromNumber: point.number, 
          playerNumber: playerNumber,
          gameState: this.gameState
        });

        if (move.possible()) {
          this.gameState.select(pointNumber);
        } else {
          this._notify(move.error.message);
        }
      }
    }
  }

  touchPass(playerNumber) {
    if (this.passable(playerNumber)) {
      this._addMoveToLastAction(this.moveList);
      this._clearMoveList();
    }
  }

  // private getters

  get _turnMessage() {
    let currentPlayerIndex = this.gameState.currentPlayerNumber - 1;
    let currentPlayerName = this.players[currentPlayerIndex].name;
    return `${currentPlayerName} to move`;
  }

  get _winnerMessage() {
    let winnerIndex = this.winner - 1;
    let winnerName = this.players[winnerIndex].name;
    return `${winnerName} wins`;
  }

  get _defaultMessage() {
    if (exists(this.winner)) {
      return this._winnerMessage;
    } else {
      return this._turnMessage;
    }
  }

  // private setters 

  _addMoveToList(move) {
    this.moveList.push(move);    
  }

  _clearMoveList() {
    this.moveList = [];
  }

  _notify(message) {
    this.notification = message;
  }

  _addRollToLastAction() {
    this.lastAction = { kind: 'roll', data: {} };
  }

  _addMoveToLastAction(moveList) {
    this.lastAction = { kind: 'move', data: { moveList: moveList } };
  }

  _clearLastAction() {
    this.lastAction = null;
  }
}

export default Match
