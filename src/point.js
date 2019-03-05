import Piece from './piece'
import exists from './exists'

class Point {
  constructor(args) { 
    this.constructorName = 'Point';
    this.number = args.number;
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = args.selected ? true : false;
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

  owner() {
    let piece = this.pieces[0];
    if (exists(piece)) {
      return piece.owner;
    } else {
      return null;
    }
  }

  // actions

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  pop(_playerNumber) {
    let piece = this.pieces.pop();
    return piece;
  }

  push(piece) {
    this.pieces.push(piece);
  }
};

export default Point
