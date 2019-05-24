import exists from './exists'
import DiceSet from './dice_set'
import Bar from './bar'
import PointSet from './point_set'
import OffBoard from './off_board'
import Move from './move'

class GameState {
  constructor(args) { 
    this.currentPlayerNumber = args.current_player_number;
    this.currentPhase = args.current_phase;
    this.dice = new DiceSet(args.dice);
    this.bar = new Bar(args.bar);
    this.points = new PointSet(args.points);
    this.offBoard = new OffBoard(args.off_board);
  }

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

  get allPiecesOffBoard() {
    return this.offBoard.piecesOwnedByPlayer(this.currentPlayerNumber).length === 15;
  }

  playersTurn(playerNumber) { 
    return this.currentPlayerNumber === playerNumber;
  }

  rollPhase() {
    return this.currentPhase === 'roll';
  }

  movePhase() {
    return this.currentPhase === 'move';
  }

  // actions

  select(pointName) {
    switch (pointName) {
      case 'bar':
        this.selectBar();
        break;
      default:
        this.selectPoint(pointName);
    } 
  }

  selectBar() {
    this.bar.select();
  }

  selectPoint(pointNumber) {
    let point = this.findPoint(pointNumber); 
    if (exists(point)) {
      point.select();
    }
  }

  deselect() {
    let point = this.selectedPoint;
    if (exists(point)) {
      point.deselect();
    }
    this.bar.deselect();
  }

  move(fromNumber, toNumber, playerNumber) {
    let from = this.findPoint(fromNumber);
    let to = this.findPoint(toNumber);

    let blot = undefined;
    if ((toNumber !== 'off_board') && to.enemyBlot(playerNumber)) {
      blot = to.pop(); 
    } 

    let movingPiece = from.pop(playerNumber);
    to.push(movingPiece);

    if (exists(blot)) {
      this.bar.push(blot);
    }
  }

  useDie(number) {
    if (this.dice.unused.findByNumber(number)) {
      this.dice.use(number);
    } else { 
      this.dice.use(this.dice.highestUnused());
    }
  }

  passTurn() {
    if (this.currentPlayerNumber == 1) {
      this.currentPlayerNumber = 2;
    } else {
      this.currentPlayerNumber = 1;
    }
  }
};

export default GameState
