import exists from './exists'
import DiceSet from './dice_set'
import Bar from './bar'
import PointSet from './point_set'
import OffBoard from './off_board'

class GameState {
  constructor(args) { 
    this.currentPlayerNumber = args.current_player_number;
    this.currentPhase = args.current_phase;
    this.dice = new DiceSet(args.dice);
    this.bar = new Bar(args.bar);
    this.points = new PointSet(args.points);
    this.offBoard = new OffBoard(args.off_board);
  }

  // queries

  selectedPoint() { 
    let point = this.points.selected();
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
      return this.points.destinations(this.bar, this.dice, playerNumber).none();
    } else {
      return this.points.ownedByPlayer(playerNumber).every((p) => {
        let noDestinations = this.points.destinations(p, this.dice, playerNumber).none();
        let somePiecesNotHome = this.points.somePiecesNotHome(playerNumber);
        let cannotBearOff = this.points.cannotBearOff(playerNumber, this.dice);
        return noDestinations && (somePiecesNotHome || cannotBearOff); 
      });
    }
  }

  allPiecesOffBoard() {
    return this.offBoard.piecesOwnedByPlayer(this.currentPlayerNumber).length == 15;
  }

  // modifiers

  move(fromNumber, toNumber) { 
    let from = this.findPoint(fromNumber);
    let to = this.findPoint(toNumber);
    let notToOffBoard = to.constructorName != 'OffBoard';
    let toEnemyBlot = to.enemyBlot(this.currentPlayerNumber);
    let blot = undefined;

    if (notToOffBoard && toEnemyBlot) {
      blot = to.pieces.pop();
    }

    to.pieces.push(from.pieces.pop());

    if (exists(blot)) {
      this.bar.pieces.push(blot);
    }
  }

  deselect() {
    this.points.deselect();
    this.bar.deselect();
  }

  useDie(number) {
    if (this.dice.unused().findByNumber(number)) {
      this.dice.use(number);
    } else { 
      this.dice.use(this.dice.highestUnused());
    }
  }

  playersTurn(playerNumber) { 
    return this.currentPlayerNumber == playerNumber;
  }

  rollPhase() {
    return this.currentPhase == 'roll';
  }

  movePhase() {
    return this.currentPhase == 'move';
  }
};

export default GameState
