import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'
import Move from './move'
import Roll from './roll'
import Pass from './pass'

//** A backgammon match */ 
class Match {
  /**
   * Create a match.
   * @param {Object} args - The properties of the match.
   * @param {number} args.number - The unique identifier of the match.
   * @param {Object} args.game_state - The properties of the game state.
   * @param {Object[]} args.players - An array of player properties.
   * @param {Object[]} args.move_list - The details of the currently built move.
   * @param {Object} args.last_action - The most recent action taken by the player. 
   * @param {string} args.notification - A notification message.
   */
  constructor(args) { 
    /** member {number} */
    this.id = args.id;

    /** member {GameState} */
    this.gameState = new GameState(args.game_state);
    
    /** member {Player[]} */
    this.players = buildPlayers(args.players);

    /** member {Object[]} */
    this.moveList = exists(args.move_list) ? args.move_list : [];

    /** member {Object} */
    this.lastAction = buildLastAction(args.last_action);

    /** member {string} */
    this.notification = buildNotification(this, args.notification);
  }

  /**
   * The match serialized as simple objects.
   * @return {Object}
   */
  get asJson() {
    let baseJson = asJson(this);
    let extraJson = {
      move_list: this.moveList
    };
    return Object.assign(baseJson, extraJson);
  }

  /**
   * The winner of the match.
   * @return {(number|null)}
   */
  get winner() {
    return winner(this);
  }

  /**
   * Can be player pass the turn?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  passable(playerNumber) { 
    let result = new Pass({
      playerNumber: playerNumber,
      match: this
    }).result;

    return result.name === 'PassValid';
  }

  // user actions

  /**
   * Roll the dice
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  touchDice(playerNumber) {
    this._clearLastAction();

    let roll = new Roll({
      playerNumber: playerNumber,
      match: this
    });

    let result = roll.result;

    switch (result.name) {
      case 'RollValid':
        this.gameState.roll();
        this.gameState.stepPhase();
        this._addRollToLastAction();
        this._notify(result.message);
        return true;
        break;
      default:
        this._notify(result.message); 
        return false;
    }
  }

  /**
   * Select a point or move to a point.
   * @param {number} pointNumber - The number of the point. 
   * @param {number} playerNumber - THe number of the player.
   * @return {boolean}
   */
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
        return true;
        break;
      case 'MoveIncomplete':
        this.gameState.move(selectedPoint.number, pointNumber, playerNumber);
        this.gameState.useDie(move.dieNumber);
        this._addMoveToList(move.details);
        this.gameState.deselect();
        this._notify(result.message);
        return false;
        break;
      case 'MovePossible': 
        this.gameState.select(pointNumber);
        this._notify(result.message);
        return false;
        break;
      default: 
        this.gameState.deselect();
        this._notify(result.message);
        return false;
    } 
  }

  /**
   * Pass the turn
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
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
        return true;
        break;
      default:
        this._notify(result.message);
        return false;
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
