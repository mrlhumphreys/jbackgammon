import { exists } from './utils'
import DiceSet from './dice_set'
import Bar from './bar'
import PointSet from './point_set'
import OffBoard from './off_board'
import Move from './move'

/** The Backgammon game state */
class GameState {
  /**
   * Create a game state.
   * @param {Object} args - The properties of the game state.
   * @param {number} args.current_player_number - The player who's turn it is.
   * @param {string} args.current_phase - What phase of the turn it is. (i.e. roll or move)
   * @param {Object[]} args.dice - The dice on the board.
   * @param {Object} args.bar - The bar where captured pieces go to.
   * @param {Object[]} args.points - The points where pieces are placed on.
   * @param {Object} args.off_board - Where pieces end up after they reach the end.
   */
  constructor(args) { 
    /** @member {number} */
    this.currentPlayerNumber = args.current_player_number;

    /** @member {string} */
    this.currentPhase = args.current_phase;

    /** @member {DiceSet} */
    this.dice = new DiceSet(args.dice);

    /** @member {Bar} */
    this.bar = new Bar(args.bar);

    /** @member {PointSet} */
    this.points = new PointSet(args.points);

    /** @member {OffBoard} */
    this.offBoard = new OffBoard(args.off_board);
  }

  /**
   * The game state serialized as simple objects.
   * @return {Object}
   */
  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      current_phase: this.currentPhase,
      dice: this.dice.asJson,
      bar: this.bar.asJson,
      points: this.points.asJson,
      off_board: this.offBoard.asJson
    }
  }

  // queries

  /**
   * The currently selected point or bar.
   * Returns null if nothing selected.
   * @return {(Point|Bar|null)}
   */
  get selectedPoint() { 
    let point = this.points.selected;
    if (point) {
      return point;
    } else if (this.bar.selected) {
      return this.bar;
    } else {
      return null;
    }
  }

  /**
   * Find point matching point identifier.
   * Returns null if nothing selected.
   * @return {(Point|Bar|null)}
   */
  findPoint(number) { 
    switch (number) {
      case 'bar':
        return this.bar;
      case 'off_board':
        return this.offBoard;
      default: 
        return this.points.findByNumber(number);
    }
  }

  /**
   * Does the player have no moves left?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  noMovesForPlayer(playerNumber) { 
    if (this.bar.hasPiecesOwnedByPlayer(playerNumber)) {
      return this.points.destinations(this.bar, this.dice, playerNumber).none;
    } else {
      return this.points.ownedByPlayer(playerNumber).every((p) => {
        let noDestinations = this.points.destinations(p, this.dice, playerNumber).none;
        let somePiecesNotHome = this.points.somePiecesNotHome(playerNumber);
        let cannotBearOff = this.points.cannotBearOff(playerNumber, this.dice);
        return noDestinations && (somePiecesNotHome || cannotBearOff); 
      });
    }
  }

  /**
   * Are all pieces off the board for the current player?
   * @return {boolean}
   */
  get allPiecesOffBoard() {
    return this.offBoard.piecesOwnedByPlayer(this.currentPlayerNumber).length === 15;
  }

  /**
   * Is it the player's turn?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  playersTurn(playerNumber) { 
    return this.currentPlayerNumber === playerNumber;
  }

  /**
   * Is it the roll phase?
   * @return {boolean}
   */
  get rollPhase() {
    return this.currentPhase === 'roll';
  }

  /**
   * Is it the move phase?
   * @return {boolean}
   */
  get movePhase() {
    return this.currentPhase === 'move';
  }

  /**
   * Which player is the winner?
   * Returns null if no winner.
   * @return {(number|null)}
   */
  get winner() {
    if (this.offBoard.hasAllOfPlayersPieces(1)) {
      return 1;
    } else if (this.offBoard.hasAllOfPlayersPieces(2)) {
      return 2;
    } else {
      return null; 
    }
  }

  // actions

  /**
   * Select the point by the identifier.
   * Returns false if no point found.
   * @param {(string|number)} pointName - The unique identifier of the point.
   * @return {boolean} 
   */
  select(pointName) {
    switch (pointName) {
      case 'bar':
        return this.selectBar();
        break;
      default:
        return this.selectPoint(pointName);
    } 
  }

  /**
   * Select the bar.
   * @return {boolean}
   */
  selectBar() {
    return this.bar.select();
  }

  /**
   * Select the point specified by the number.
   * Return false if the point can't be found.
   * @param {number} pointNumber - The identifier of the point.
   * @return {boolean}
   */
  selectPoint(pointNumber) {
    let point = this.findPoint(pointNumber); 
    if (exists(point)) {
      return point.select();
    } else {
      return false;
    }
  }

  /**
   * Deselect the selected point and bar.
   * @return {boolean}
   */
  deselect() {
    let point = this.selectedPoint;
    if (exists(point)) {
      point.deselect();
    }
    this.bar.deselect();
    return true;
  }

  /**
   * Move a piece from one point to another. 
   * @param {number} fromNumber - The identifier of the from point.
   * @param {number} toNumber - The identifier of the to point.
   * @param {number} playerNumber - The number of the to player.
   * @return {boolean}
   */
  move(fromNumber, toNumber, playerNumber) {
    let from = this.findPoint(fromNumber);
    let to = this.findPoint(toNumber);

    if (from !== null && to !== null) {
      let blot = undefined;
      if ((toNumber !== 'off_board') && to.enemyBlot(playerNumber)) {
        blot = to.pop(); 
      } 

      let movingPiece = from.pop(playerNumber);
      to.push(movingPiece);

      if (exists(blot)) {
        this.bar.push(blot);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Roll the dice
   */
  roll() {
    this.dice.roll();
    return true;
  }

  /**
   * Mark a die as used, matching the number.
   * @param {number} number - The number of the die
   * @return {boolean}
   */
  useDie(number) {
    if (this.dice.unused.findByNumber(number)) {
      return this.dice.use(number);
    } else { 
      return this.dice.use(this.dice.highestUnused());
    }
  }

  /**
   * Pass the turn to the other player.
   * @return {boolean}
   */
  passTurn() {
    if (this.currentPlayerNumber == 1) {
      this.currentPlayerNumber = 2;
    } else {
      this.currentPlayerNumber = 1;
    }
    return true;
  }

  /**
   * Step to the next phase.
   * @return {boolean}
   */
  stepPhase() {
    if (this.currentPhase == 'roll') {
      this.currentPhase = 'move';
    } else {
      this.currentPhase = 'roll';
    }
    return true;
  }

  /**
   * clear dice in preparation of next turn.
   * @return {boolean}
   */
  clearDice() {
    this.dice.clear();
    return true;
  }
};

export default GameState
