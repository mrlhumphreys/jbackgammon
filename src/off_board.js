import exists from './exists'
import Piece from './piece'

class OffBoard {
  constructor(args) { 
    this.constructorName = 'OffBoard';
    this.number = 'off_board';
    this.pieces = args.pieces.map(function(p) { return new Piece(p) });
    this.selected = exists(args.selected) ? args.selected : false
  }

  asJson() {
    return {
      pieces: this.pieces.map(function(p) { return p.asJson() }),
      selected: this.selected
    };
  }

  // queries

  piecesOwnedByPlayer(playerNumber) { 
    return this.pieces.filter(function(p) { return p.owner === playerNumber; });
  }

  enemyBlot(playerNumber) {
    return false;
  }

  // actions

  push(piece) {
    this.pieces.push(piece);
  }
};

export default OffBoard
