import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import exists from './exists'
import GameState from './game_state'
import Move from './move'
import Player from './player'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = buildPlayers(args.players);
    this.moveList = exists(args.move_list) ? args.move_list : [];
    this.lastAction = buildLastAction(args.last_action);
    this.notification = buildNotification(this, args.notification);
  }

  get asJson() {
    let baseJson = asJson(this);
    let extraJson = {
      move_list: this.moveList
    };
    return Object.assign(baseJson, extraJson);
  }

  get winner() {
    return winner(this);
  }

  passable(playerNumber) { 
    let playersTurn = this.gameState.playersTurn(playerNumber);
    let movePhase = this.gameState.movePhase;
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
    } else if (this.gameState.movePhase) {
      this._notify('Dice have already been rolled.');
    } else if (this.gameState.rollPhase) {
      this._addRollToLastAction();
    }
  }

  touchPoint(pointNumber, playerNumber) {
    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.'); 
    } else if (!this.gameState.playersTurn(playerNumber)) {
      this._notify('It is not your turn.');
    } else if (this.gameState.rollPhase) {
      this._notify('Pieces cannot move until the dice are rolled.');
    } else if (this.gameState.movePhase) {
      let selectedPoint = this.gameState.selectedPoint;
      let point = this.gameState.findPoint(pointNumber);

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
            this.gameState.passTurn(); 
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
      this.gameState.passTurn(); 
      this._addMoveToLastAction(this.moveList);
      this._clearMoveList();
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
