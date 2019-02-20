import Piece from './piece'

class Point {
  constructor(args) { 
    this.constructorName = 'Point';
    this.number = args.number;
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = args.selected ? true : false;
  }

  // modifiers

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  // queries

  blocked() {
    return this.pieces.length >= 2;
  }

  blot() {
    return this.pieces.length == 1;
  }

  empty() {
    return this.pieces.length == 0;
  }

  ownedBy(playerNumber) {
    return this.pieces.some(function(p) { return p.owner == playerNumber; });
  }

  ownedByOpponent(playerNumber) {
    return this.pieces.some(function(p) { return p.owner != playerNumber; });
  }

  enemyBlot(playerNumber) { 
    return this.blot() && this.ownedByOpponent(playerNumber);
  }

  home(playerNumber) { 
    switch (playerNumber) {
      case 1:
        return 19 <= this.number && this.number <= 24;
      case 2:
        return 1 <= this.number && this.number <= 6;
      default: 
        return false;
    }
  }

  distanceFromOffBoard(playerNumber) {
    switch (playerNumber) {
      case 1:
        return 25 - this.number;
      case 2:
        return 0 + this.number;
      default: 
        null
    }
  }
};

export default Point
