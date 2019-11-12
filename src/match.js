import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'
import Move from './move'
import Roll from './roll'
import Pass from './pass'

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
    let result = new Pass({
      playerNumber: playerNumber,
      match: this
    }).result;

    return result.name === 'PassValid';
  }

  // user actions

  touchDice(playerNumber) {
    this._clearLastAction();

    let roll = new Roll({
      playerNumber: playerNumber,
      match: this
    });

    let result = roll.result;

    switch (result.name) {
      case 'RollValid':
        this._addRollToLastAction();
        break;
      default:
        this._notify(result.message); 
    }
  }

  touchPoint(pointNumber, playerNumber) {
    this._clearLastAction();

    let selectedPoint = this.gameState.selectedPoint;
    let move = new Move({
      touchedPointNumber: pointNumber,
      playerNumber: playerNumber,
      match: this
    });

    let result = move.result;

    switch (result.name) {
      case 'MoveComplete':
        this.gameState.move(selectedPoint.number, pointNumber, playerNumber);
        this.gameState.useDie(move.dieNumber);
        this.gameState.passTurn(); 
        this._addMoveToLastAction(move.completeMoveList);
        this._clearMoveList();
        this.gameState.deselect();
        break;
      case 'MoveIncomplete':
        this.gameState.move(selectedPoint.number, pointNumber, playerNumber);
        this.gameState.useDie(move.dieNumber);
        this._addMoveToList(move.details);
        this.gameState.deselect();
        this._notify(result.message);
        break;
      case 'MovePossible': 
        this.gameState.select(pointNumber);
        this._notify(result.message);
        break;
      default: 
        this.gameState.deselect();
        this._notify(result.message);
    } 
  }

  touchPass(playerNumber) {
    let pass = new Pass({
      playerNumber: playerNumber,
      match: this 
    });

    let result = pass.result;

    switch (result.name) {
      case 'PassValid':
        this.gameState.passTurn(); 
        this._addMoveToLastAction(this.moveList);
        this._clearMoveList();
        break;
      default:
        this._notify(result.message);
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
